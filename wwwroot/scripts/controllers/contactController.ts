module app.common{
    interface IContact{
        name:string;
        message:string;
        email:string;
        company:string;
    }
    
    interface IContactController{
        title:string;
        description:string;
        
        sendMessage(contact:IContact):void;
    }
    
    class ContactController implements IContactController{
        static $inject = [];
        
        constructor(public title:string, public description:string){
            var self = this;
            
            self.title = "Contact Page";
            self.description = "Contact me...";
        }
        
        sendMessage(contact:IContact) : void {
            //TODO send contact information to an email address
            //if using nodejs could use nodemailer
        }
    }
    
    angular.module("core-starter")
           .controller("contactController", ContactController);    
}