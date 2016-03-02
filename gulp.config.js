/* gulp configuration file */

module.exports = function(){
  var basePath = "./";
  var layoutPath = basePath + "Views/Shared/";  
  var clientPath = "./wwwroot/";
  var scriptsPath = clientPath + "scripts/";
  var sassPath = clientPath + "scss/";
  var cssPath = clientPath + "css/app/";
      
  var config = {
      //file paths
      clientPath: clientPath,
      cssPath: cssPath,
      layoutPath: layoutPath,
          
      sassFiles: sassPath + "site.scss",  
      layoutFile: layoutPath + "_Layout.cshtml",    
     
     js: {
          appjs: scriptsPath + "js/app.js",
          scripts: scriptsPath + "js/*.js",
          exclude: "!./wwwroot/scripts/js/app.js"
      },
      
      //bower settings for injection (wiredep)
      bower: {
          json: require("./bower.json"),
          directory: clientPath + "libs/",
          ignorePath: "../../wwwroot"
      },
      
      //Typescripts settings for use when converting to javascript
      typescript: {          
          filePaths: [
              scriptsPath + "app.ts",           
              scriptsPath + "controllers/*.ts",
              scriptsPath + "directives/*.ts" 
          ],             
          javascriptOutput: scriptsPath + "js/"          
      }
  };
  
  config.getWiredepDefaultOptions = function(){
    var options = {
        bowerJson: config.bower.json,
        directory: config.bower.directory ,
        ignorePath: config.bower.ignorePath  
    };
    
    return options; 
  };
  
  return config;  
};