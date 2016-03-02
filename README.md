# AspNetCoreStarter
Asp.Net Core 1.0 starter website showcasing how all the pieces fit together

## Description
Starter website that mirrors the `node.js` [ResponsiveStarter](https://github.com/SWilkov/ResponsiveStarter/) website but this time uses
Asp.Net Core 1.0 technologies.

##Install
After cloning the repository run the following in order using the Command Line of your choice. (Make sure you're in the root of the project)
Asp.Net Core uses the `DNX` engine to manage packages that are found in `project.json` so first we need to restore the dependent packages

`dnu restore`

next we need to install node and bower packages so run

'npm install'
'bower install'

finally run a couple of `gulp` tasks to get everything in order

`gulp compile-ts`  will compile the typescript files into javascript then

`gulp-inject`  will add all the relevant bower, js, css into **_Layout.cshtml

to start the server simply type

'dnu build` - quick build to check everything is ok
`dnx web`  - starts the server

All thats left is start up a browser and navigate to `localhost`
