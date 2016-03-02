using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Builder;
using Microsoft.AspNet.Hosting;
using Microsoft.AspNet.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.PlatformAbstractions;
using Newtonsoft.Json.Serialization;

namespace aspnetCoreStarter
{
    public class Startup
    {
        
        //Configuration file to store app settings
        public static IConfigurationRoot AppConfiguration;
                
        public Startup(IApplicationEnvironment env)
        {
            var builder = new ConfigurationBuilder()
                                 .SetBasePath(env.ApplicationBasePath)
                                 .AddJsonFile("config.json")
                                 .AddEnvironmentVariables();
                                 
            AppConfiguration = builder.Build();
        }
        
        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit http://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {
            //Add Mvc
            services.AddMvc(config => {
                #if !DEBUG
                
                #endif
            })
            .AddJsonOptions(options => 
            {
                options.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            });
            
            //Add logging
            services.AddLogging();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, ILoggerFactory loggerFactory, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                loggerFactory.AddDebug(LogLevel.Information);
            }
            else
            {
                loggerFactory.AddDebug(LogLevel.Debug);
            }
            
            app.UseIISPlatformHandler();            
            app.UseStaticFiles(); 
            
            //Mvc config
            app.UseMvc(config =>
            {
                 config.MapRoute(
                      name: "default",
                      template: "{controller}/{action}/{id?}",
                      defaults: new { controller = "App", action = "Index" }
                    );    
            });   
        }

        // Entry point for the application.
        public static void Main(string[] args) => Microsoft.AspNet.Hosting.WebApplication.Run<Startup>(args);
    }
}
