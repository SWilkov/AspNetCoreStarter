var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var debug = require("gulp-debug");
var tasklisting = require("gulp-task-listing");
var autoprefixer = require("gulp-autoprefixer");
var inject = require("gulp-inject");
var rename = require("gulp-rename");

var ts = require("gulp-typescript");
var series = require("stream-series");

var del = require("del");

//local config for gulpfile
var config = require("./gulp.config")(); 

/** help lists all gulp tasks */
gulp.task("help", function(){
   return tasklisting(); 
});

/** watch sass files for changes */
gulp.task("sass:watch", function(){
    log("Starting sass watch");
    gulp.watch(config.sassFiles, ["styles"]);
});

/** convert sass files to css */
gulp.task("styles", ["clean-styles"], function(){
   log("converting sass to css");
   
   return gulp.src(config.sassFiles)
              .pipe(sass().on("error", sass.logError))
              .pipe(autoprefixer({ browsers: [ "> 5%" ]}))
              .pipe(gulp.dest(config.cssPath)); 
});

/** clean styles from temp folder */
gulp.task("clean-styles", function(){
   log("cleaning styles from temp folder");
   clean(config.clientPath + "css/app/**/*.css"); 
});

/** wiredep - inject bower js into index.html */
gulp.task("wiredep", ["styles"], function() {
   log("Starting wiredep for bower js and custom js");
   
   var options = config.getWiredepDefaultOptions();
   var wiredep = require("wiredep").stream;
   
   var mainapp = gulp.src(config.js.appjs);
   var otherjs = gulp.src([config.js.scripts, config.js.exclude]);
   
   return gulp.src(config.layoutFile)
              .pipe(wiredep(options))
              .pipe(debug())
              .pipe(inject(series(mainapp, otherjs), { ignorePath: "wwwroot" }))
              .pipe(debug())
              .pipe(gulp.dest(config.layoutPath));
});


/** inject css into index.html */
gulp.task("inject", ["wiredep"], function () {
   log("injecting css into _Layout.cshtml"); 
   
   return gulp.src(config.layoutFile)
              .pipe(inject(gulp.src(config.cssPath + "site.css"), { ignorePath: "wwwroot"} ))
              .pipe(debug())
              .pipe(gulp.dest(config.layoutPath));             
});

/** delete js files  */
gulp.task("clean-ts", function(callback){
    log("Starting delete js files");
    var jsFiles = config.typescript.javascriptOutput + "*.js";
    clean(jsFiles);
});

/** compile typescript to javascript */
gulp.task("compile-ts", function(){
    log("Starting to compile typescript files to javascript");
   var sourceTsFiles = config.typescript.filePaths; 
      
   var tsProject = ts.createProject({
       declaration: true,
       noExternalResolve: true
   });
      
   var tsResult = gulp.src(sourceTsFiles)
                      .pipe(ts(tsProject));
       
     return tsResult.js
             .pipe(gulp.dest(config.typescript.javascriptOutput));    
});


/** Helper Functions */
function log(message){
    console.log(message);
}

function clean(path){
    log("cleaning files from path " + path);
    del(path);
}

