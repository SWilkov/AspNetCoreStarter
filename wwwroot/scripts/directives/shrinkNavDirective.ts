/** ShrinkNav shrinks the top navigation bar when the user scrolls down from the top
 * css class used is shrink which reduces the height to 35px in this example
 * if your navbar is a different size to mine (50px) change the shrinkHeight attribute
 * eg your navigation holder is 100px
 * <nav shrink-nav shrink-height="100"/>
 * change shrink css height to whatever you need
 */

module app.common{
    interface IShrinkNavAttributes extends ng.IAttributes{
        shrinkHeight:string;
    }
    
    class ShrinkNav implements ng.IDirective{
        restrict = "A";
        shrinkClassName: string = "shrink";
        
        constructor(private $window: ng.IWindowService){
            console.log("ShrinkNavDirective constructor");
            console.log($window);
        }
        
        link = 
            (scope: ng.IScope, element: ng.IAugmentedJQuery, attrs: IShrinkNavAttributes) =>
            {
                var height = scope.$eval(attrs.shrinkHeight);
                var $element = angular.element(element);
                
                /** listens to the JQuery scroll event 
                 *  checks height is over shrink-height attribute and shrinks
                 */
                 angular.element(this.$window).bind("scroll", 
                    (event: JQueryEventObject) => {
                        if(this.$window.pageYOffset > height){
                            $element.addClass(this.shrinkClassName);
                        } else {
                            $element.removeClass(this.shrinkClassName);
                        }  
                })                
            }
        
        //Factory method used to create new instance of ShrinkNav   
        static factory() : ng.IDirectiveFactory{
            const directive = ($window: ng.IWindowService) => 
                new ShrinkNav($window);
            directive.$inject = ["$window"];
            return directive;
        }
    }
    
    angular.module("common.directives")
           .directive("shrinkNav", ShrinkNav.factory());
}