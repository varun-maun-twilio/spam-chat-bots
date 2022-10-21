const studioFlow = require("../studio-flows/fs-prefilter.json")
const {StudioFlowExecution} = require("../tests/test-setup/studio-flow")

describe('test FS Prefilter BOT',  () => {
    it('Beratung-flow',  async() => {

        const testClient = new StudioFlowExecution(studioFlow);        
        testClient.triggerFlow('message',{'body':'Hello'});
        
        const reply1 = await testClient.getLastReply(1);
        const reply2 = await testClient.getLastReply(0);
        expect(reply1).toBe("Hallo herzlich willkommen bei IU Internationale Hochschule! Vielen Dank für Deine Anfrage.");
        expect(reply2).toBe("Du möchtest mehr über ein Studium bei uns erfahren? Dann antworte mit _*Beratung*_ Du hast Fragen zum Status deiner Einschreibung? Dann antworte mit _*Einschreibung*_ Du studierst bereits bei uns? Dann antworte mit _*Studium*_.");
        testClient.sendMessage("Beratung");
        const reply3 = await testClient.getLastReply(0);
        expect(reply3).toBe("Ok, dann leite ich dich jetzt an unsere Studienberater weiter.");
        expect(testClient.executionContext.flow.variables.isAgentRequested).toBe('Y');
        expect(testClient.isEnded).toBe(true);

      
    });
    it('Einschreibung-flow',  async() => {

        const testClient = new StudioFlowExecution(studioFlow);        
        testClient.triggerFlow('message',{'body':'Hello'});
        
        const reply1 = await testClient.getLastReply(1);
        const reply2 = await testClient.getLastReply(0);
        expect(reply1).toBe("Hallo herzlich willkommen bei IU Internationale Hochschule! Vielen Dank für Deine Anfrage.");
        expect(reply2).toBe("Du möchtest mehr über ein Studium bei uns erfahren? Dann antworte mit _*Beratung*_ Du hast Fragen zum Status deiner Einschreibung? Dann antworte mit _*Einschreibung*_ Du studierst bereits bei uns? Dann antworte mit _*Studium*_.");
        testClient.sendMessage("Einschreibung");
        const reply3 = await testClient.getLastReply(0);
        expect(reply3).toBe("Leider kommt es aufgrund zahlreicher Anfragen zu einer verlängerten Bearbeitungszeit. Du erhältst bis zu 14 Tage nach Einreichung deiner vollständigen Bewerbung eine Rückmeldung. Wir bitten dich daher um etwas Geduld. Hast du trotzdem weitere Fragen?");
        expect(testClient.executionContext.flow.variables.isAgentRequested).not.toBe('Y');
        expect(testClient.isEnded).toBe(true);

      
    });
    it('Studium-flow',  async() => {

        const testClient = new StudioFlowExecution(studioFlow);        
        testClient.triggerFlow('message',{'body':'Hello'});
        
        const reply1 = await testClient.getLastReply(1);
        const reply2 = await testClient.getLastReply(0);
        expect(reply1).toBe("Hallo herzlich willkommen bei IU Internationale Hochschule! Vielen Dank für Deine Anfrage.");
        expect(reply2).toBe("Du möchtest mehr über ein Studium bei uns erfahren? Dann antworte mit _*Beratung*_ Du hast Fragen zum Status deiner Einschreibung? Dann antworte mit _*Einschreibung*_ Du studierst bereits bei uns? Dann antworte mit _*Studium*_.");
        testClient.sendMessage("Studium");
        
        console.log(testClient.messages)
        const reply3 = await testClient.getLastReply(1);
        const reply4 = await testClient.getLastReply(0);
        expect(reply3).toBe("Bitte wende dich mit deinem Anliegen via Email oder Telefon an unser Studierendensekretariat. Unser Team ist Mo-Fr von 08:00 – 20:00 Uhr und Sa​von 09:00 – 17:00 Uhr erreichbar. Email: studium-fernstudium@iu.org Telefon:+493031198855 Hast du trotzdem weitere Fragen?​");
        expect(reply4).toBe("Du möchtest mehr über ein Studium bei uns erfahren? Dann antworte mit _*Beratung*_ Du hast Fragen zum Status deiner Einschreibung? Dann antworte mit _*Einschreibung*_ Du studierst bereits bei uns? Dann antworte mit _*Studium*_.");
        expect(testClient.executionContext.flow.variables.isAgentRequested).not.toBe('Y');
        expect(testClient.isEnded).not.toBe(true);


      
    });
  
  });
