module app.common{
    
    class BottomContentController implements IContentController{
        static $inject = [];
        
        constructor(public title:string, public description:string) {
            
            var self = this;
            self.title = "Bottom Content",
            self.description = "The Bottom Content is here to show how to use angulars ui router to seperate an html page into segments with dedicated views and controllers"               
        }        
    }

    angular.module("core-starter")
           .controller("bottomContentController", BottomContentController);
}