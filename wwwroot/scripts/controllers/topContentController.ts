module app.common {
    interface ITechItem{
        technology:string;
        positives:string;
    } 
    
    class TechItem implements ITechItem{
        constructor(public technology:string, public positives:string){
                      
        }
    }   
    
    class TopContentController implements IContentController {
        static $inject = [];
        public importantItems: TechItem[] = [];
        
        constructor(public title:string, 
                    public description:string) {
            var self = this;
            
            self.title = "This is the Top Content :)";
            self.description = "This is a starter template to get a basic website up and running in node using typescript and angular. This template shows the basics of angular controllers, directives and most importantly linking all the pieces together"
            self.importantItems = [
                new TechItem("angular", "great framework for single page apps (SPA's) using javascript"),
                new TechItem("angular ui router", "change pages easily using state"),
                new TechItem("typescript", "if you're used to C# then typescript is a great choice"),
                new TechItem("responsive design", "no bootstrap here but it could easily be added for content"),
                new TechItem("node", "simple node server using express"),
                new TechItem("gulp", "create great workflows using gulp")];               
            
        }
    }
    
    angular.module("core-starter")
           .controller("topContentController", TopContentController);    
}