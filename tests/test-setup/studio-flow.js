const Handlebars = require("handlebars");

const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

class StudioFlowExecution {
    constructor(studioFlowConfig) {
        this.studioFlowConfig = studioFlowConfig;
        this.widgetsMap = studioFlowConfig.states.reduce((a, v) => { return { ...a, [v['name']]: v } }, {})
        this.currentNode = 'Trigger';
        this.messages = [];
        this.executionContext = {flow:{variables:{}},widgets:{},trigger:{}};
        this.waitingForInput==false;
        this.isEnded = false;
    }

    setCurrentNode(newNode){       
        this.currentNode = newNode;
    }


    triggerFlow(eventType,{body}){
        if(eventType=="message"){
            this.messages.push({ body, author:'user', });
            this.executionContext.trigger.message = {Body:body};
            this.navigateToNextNode('incomingMessage');
        }
    }

   async getLastReply(index=0,delayInterval=100){

    await delay(delayInterval);
        try{
            return this.messages.filter(x=>x.author!='user').map(x=>x.body).reverse()[index] || null;
        }
        catch(e){
            return null;
        }
    }

    sendMessage(body,author='user') {        
        this.messages.push({ body, author})
        this.executeNode(null,{body});
    }

    buildTemplatedMessage(text){
        const template = Handlebars.compile(text);        
        return template(this.executionContext);
    }

    executeNode(inputNodeName,nodeContext){
        let nodeName =  inputNodeName || this.currentNode;
        const node = this.widgetsMap[nodeName];    
      


          
        if(node.type=='send-message'){            
            const outboundMessageBody = this.buildTemplatedMessage(node.properties.body);
            this.messages.push({ body:outboundMessageBody, author:'system'}); 
            this.executionContext.widgets[nodeName] = {outbound:{Body:outboundMessageBody}};                       
            this.navigateToNextNode('sent');
        }
        else if(node.type=='send-and-wait-for-reply'){   
            
            if(this.waitingForInput != true){
                const outboundMessageBody = this.buildTemplatedMessage(node.properties.body);    
                this.messages.push({ body:outboundMessageBody, author:'system'});   
                this.executionContext.widgets[nodeName] = {outbound:{Body:outboundMessageBody}};  
                this.waitingForInput = true;     
            }else{
                this.executionContext.widgets[nodeName] = {
                    ...this.executionContext.widgets[nodeName],
                    inbound:{Body:nodeContext?.body}
                };  
                this.waitingForInput = false;
                this.navigateToNextNode('incomingMessage');
            }   
        }
        else if(node.type=='split-based-on'){ 
            

            
            const matchTransitions = node.transitions.filter(x=>x.event=='match');
            
            let nextNodeForFoundMatch = null;
            for(let transitionIter=0;transitionIter<matchTransitions.length;transitionIter++){
                    const {conditions,next} = matchTransitions[transitionIter];
                    const conditionResults = conditions.map(c=>{
                        const arg = this.buildTemplatedMessage(c.arguments[0]);            

                        if(c.type=="equal_to" && c.value==arg){
                            return true;
                        }
                        else if(c.type=="matches_any_of" && c.value.split(",").indexOf(arg)>-1){
                            return true;
                        }
                        return false;
                    });
                    
                    const matchResult = conditionResults.reduce((a,v)=>a&&v,true);                        
                    if(matchResult==true){
                        nextNodeForFoundMatch = next;
                        break;
                    }
            }
           
            if(nextNodeForFoundMatch==null){
                this.navigateToNextNode('noMatch');
            }
            else{
                this.setCurrentNode(nextNodeForFoundMatch);
                this.executeNode(nextNodeForFoundMatch);
            }
           

        }
        else if(node.type=='set-variables'){
            const {variables} = node.properties;

            for(let v of variables){
                this.executionContext.flow.variables[v['key']]=this.buildTemplatedMessage(v['value']);
            }


            this.navigateToNextNode('next');
        }
        else{
            this.isEnded = true;
        }
    }


    navigateToNextNode(transitionEvent){
       
        const {transitions} = this.widgetsMap[this.currentNode];
        let matchedTransition = transitions.find(t=>t.event==transitionEvent);       
        if(matchedTransition && matchedTransition.next!=null){
            this.setCurrentNode(matchedTransition.next);            
            this.executeNode();
        }
        else{
            this.isEnded = true;
        }

    }

  


}
module.exports = {StudioFlowExecution};