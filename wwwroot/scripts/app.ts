/** app.ts 
 *  main entry point for the app 
 *  takes care of setting up $StateProvider for SPA navigation
 * */
 
 module app{
     var main = angular.module("core-starter",
                    ["ui.router", "common.directives"]);
     
     main.config(stateConfig);
     stateConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
                    
     function stateConfig($stateProvider: ng.ui.IStateProvider,
                        $urlRouterProvider: ng.ui.IUrlRouterProvider) : void {
                            
          $urlRouterProvider.otherwise("/");
          
          $stateProvider
            .state("home", {
                  url: "/",
                  templateUrl: "/views/home.html",
                  views: {
                      "" : { templateUrl: "/views/home.html" },
                      "topContent@home": {
                          templateUrl: "/views/topContent.html",
                          controller: "topContentController as vm"
                      },
                      "bottomContent@home":{
                          templateUrl: "/views/bottomContent.html",
                          controller: "bottomContentController as vm"
                      }                      
                  }
            })
            .state("contact", {
                url: "/contact",
                views: {
                    "": { 
                            templateUrl: "/views/contact.html",
                            controller: "contactController as vm"
                         }
                }
            })
            .state("about", {
                url: "/about",
                views:{
                    "" : {
                        templateUrl: "/views/about.html",
                        controller: "aboutController as vm"
                    }
                }
            }); 
                           
       }
 }