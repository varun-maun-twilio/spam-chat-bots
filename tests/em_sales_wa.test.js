const studioFlow = require("../studio-flows/em_sales_wa.json")
const {StudioFlowExecution} = require("../tests/test-setup/studio-flow")

describe('test EM SALES BOT',  () => {
    it('option1-flow-end',  async() => {

        const testClient = new StudioFlowExecution(studioFlow);        
        testClient.triggerFlow('message',{'body':'Hello'});
        
        const reply1 = await testClient.getLastReply(1);
        const reply2 = await testClient.getLastReply(0);
        expect(reply1).toBe("Hi 😊, my name is Iva, the IU International Virtual Assistant. I am a robot and I am still learning how to find the best answers for you. I can help you with the following topics:");
        expect(reply2).toBe("*1.* Free info package about IU International study programmes\\n*2.* Application Documents\\n*3.* Fees/Scholarship\\n*4.* How to study at IU International\\n*5.* IU International accreditation\\n*6.* Can I come to Germany?\\n*7.* When can I start studying?\\n\\n\\nPlease type the *NUMBER* of the topic you are interested in.");

        testClient.sendMessage("1");
        const reply3 = await testClient.getLastReply(1);
        const reply4 = await testClient.getLastReply(0);

        expect(reply3).toBe("Ok, got it. Just follow this link and click on *request free information*:https://www.iu.org");
        expect(reply4).toBe("Please type *MENU* to get back to the main menu.\\n\\nType *END* if you would like to end our conversation.\\n\\nType *AGENT* if you want to talk to a studyadvisor.");


        testClient.sendMessage("end");
        expect(testClient.executionContext.flow.variables.isAgentRequested).not.toBe('Y');
        expect(testClient.isEnded).toBe(true);

      
    });
    it('option1-flow-agent',  async() => {

        const testClient = new StudioFlowExecution(studioFlow);        
        testClient.triggerFlow('message',{'body':'Hello'});
        
        const reply1 = await testClient.getLastReply(1);
        const reply2 = await testClient.getLastReply(0);
        expect(reply1).toBe("Hi 😊, my name is Iva, the IU International Virtual Assistant. I am a robot and I am still learning how to find the best answers for you. I can help you with the following topics:");
        expect(reply2).toBe("*1.* Free info package about IU International study programmes\\n*2.* Application Documents\\n*3.* Fees/Scholarship\\n*4.* How to study at IU International\\n*5.* IU International accreditation\\n*6.* Can I come to Germany?\\n*7.* When can I start studying?\\n\\n\\nPlease type the *NUMBER* of the topic you are interested in.");

        testClient.sendMessage("1");
        const reply3 = await testClient.getLastReply(1);
        const reply4 = await testClient.getLastReply(0);

        expect(reply3).toBe("Ok, got it. Just follow this link and click on *request free information*:https://www.iu.org");
        expect(reply4).toBe("Please type *MENU* to get back to the main menu.\\n\\nType *END* if you would like to end our conversation.\\n\\nType *AGENT* if you want to talk to a studyadvisor.");


        testClient.sendMessage("agent");
        expect(testClient.executionContext.flow.variables.isAgentRequested).toBe('Y');
        expect(testClient.isEnded).toBe(true);

      
    });
    it('option2-flow-end',  async() => {

        const testClient = new StudioFlowExecution(studioFlow);        
        testClient.triggerFlow('message',{'body':'Hello'});
        
        const reply1 = await testClient.getLastReply(1);
        const reply2 = await testClient.getLastReply(0);
        expect(reply1).toBe("Hi 😊, my name is Iva, the IU International Virtual Assistant. I am a robot and I am still learning how to find the best answers for you. I can help you with the following topics:");
        expect(reply2).toBe("*1.* Free info package about IU International study programmes\\n*2.* Application Documents\\n*3.* Fees/Scholarship\\n*4.* How to study at IU International\\n*5.* IU International accreditation\\n*6.* Can I come to Germany?\\n*7.* When can I start studying?\\n\\n\\nPlease type the *NUMBER* of the topic you are interested in.");

        testClient.sendMessage("2");
        const reply3 = await testClient.getLastReply(0);        

        expect(reply3).toBe("Type *BACHELOR*  if you are interested in a bachelor programme\\n\\nType *MASTER*  for our master programmes\\n\\nType *MBA* for our MBA programmes.");

        testClient.sendMessage("BACHELOR");
        const reply4 = await testClient.getLastReply(1);
        const reply5 = await testClient.getLastReply(0);                

        expect(reply4).toBe("Ok, got it. For an overview of all of our Bachelor programmes, please check out this link: https://www.iu.org/bachelor/\\n\\n*We need the following documents for your application:*\\n\\n- higher secondary school leaving certificate or tertiary education certificate (e.g. Higher National Diploma)\\n\\n-CV\\n\\n- passport or ID");
        expect(reply5).toBe("Please type *MENU* to get back to the main menu.\\n\\nType *END* if you would like to end our conversation.\\n\\nType *AGENT* if you want to talk to a studyadvisor.");
        


        testClient.sendMessage("end");
        expect(testClient.executionContext.flow.variables.isAgentRequested).not.toBe('Y');
        expect(testClient.isEnded).toBe(true);

      
    });
    it('option2-flow-agent',  async() => {

        const testClient = new StudioFlowExecution(studioFlow);        
        testClient.triggerFlow('message',{'body':'Hello'});
        
        const reply1 = await testClient.getLastReply(1);
        const reply2 = await testClient.getLastReply(0);
        expect(reply1).toBe("Hi 😊, my name is Iva, the IU International Virtual Assistant. I am a robot and I am still learning how to find the best answers for you. I can help you with the following topics:");
        expect(reply2).toBe("*1.* Free info package about IU International study programmes\\n*2.* Application Documents\\n*3.* Fees/Scholarship\\n*4.* How to study at IU International\\n*5.* IU International accreditation\\n*6.* Can I come to Germany?\\n*7.* When can I start studying?\\n\\n\\nPlease type the *NUMBER* of the topic you are interested in.");

        testClient.sendMessage("2");
        const reply3 = await testClient.getLastReply(0);        

        expect(reply3).toBe("Type *BACHELOR*  if you are interested in a bachelor programme\\n\\nType *MASTER*  for our master programmes\\n\\nType *MBA* for our MBA programmes.");

        testClient.sendMessage("BACHELOR");
        const reply4 = await testClient.getLastReply(1);
        const reply5 = await testClient.getLastReply(0);                

        expect(reply4).toBe("Ok, got it. For an overview of all of our Bachelor programmes, please check out this link: https://www.iu.org/bachelor/\\n\\n*We need the following documents for your application:*\\n\\n- higher secondary school leaving certificate or tertiary education certificate (e.g. Higher National Diploma)\\n\\n-CV\\n\\n- passport or ID");
        expect(reply5).toBe("Please type *MENU* to get back to the main menu.\\n\\nType *END* if you would like to end our conversation.\\n\\nType *AGENT* if you want to talk to a studyadvisor.");
        


        testClient.sendMessage("agent");
        expect(testClient.executionContext.flow.variables.isAgentRequested).toBe('Y');
        expect(testClient.isEnded).toBe(true);

      
    });
  
  
  });
