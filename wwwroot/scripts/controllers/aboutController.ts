/** aboutController.ts */

module app.common{
    
    interface IAboutController{
        title:string;
        aboutMe:string;
    }
    
    class AboutController implements IAboutController{
        static $inject = [];
        
        constructor(public title:string, public aboutMe:string){
            var self = this;
            self.title = "about page";
            self.aboutMe = "A little bit about me....";
        }
    }
    
    angular.module("core-starter")
           .controller("aboutController", AboutController);
}