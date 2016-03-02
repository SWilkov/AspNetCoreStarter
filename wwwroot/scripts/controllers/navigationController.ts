/** NavigationController.ts 
 * Need to load up mobile-nav (and close it) when hamburger menu is clicked
 * This controller takes care of that with variable hamburgerMenuActive on the 
 * $rootScope.
 */

module app.common {
    interface INavigationController {
        hamburgerMenuClicked(): void;
        closeMobileMenu(): void;
    }
    
    interface ICustomRootScope extends ng.IRootScopeService{
        hamburgerMenuActive:boolean;
    }
    
    class NavigationController implements INavigationController{
        static $inject = ["$rootScope"];
        
        constructor(private $rootScope: ICustomRootScope) {
            
            //Set the hamburgerMenuActive to false on website startup
            $rootScope.hamburgerMenuActive = false;
        }
        
        /** opens and close mobile menu via hamburger button */
        hamburgerMenuClicked(): void{
            var self = this;
            
            if (self.$rootScope.hamburgerMenuActive){
                self.$rootScope.hamburgerMenuActive = false;
            }else{
                self.$rootScope.hamburgerMenuActive = true;
            }            
        }
        
        closeMobileMenu(): void{
            var self = this;
            self.$rootScope.hamburgerMenuActive = false;
        }
    }
    
    angular.module("core-starter")
           .controller("navigationController", NavigationController);
}