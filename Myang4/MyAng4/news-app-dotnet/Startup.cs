using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NewsAppWApi.Models;
using NewsAppWApi.Models.DataManager;
using NewsAppWApi.Models.Repository;
using Microsoft.EntityFrameworkCore;
using System;

namespace news_app_dotnet
{
  public class Startup
  {
    public Startup(IHostingEnvironment env)
    {
      var builder = new ConfigurationBuilder()
        .SetBasePath(env.ContentRootPath)
        .AddJsonFile("appsettings.json", optional: true, reloadOnChange: true)
        .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
        .AddEnvironmentVariables();
      Configuration = builder.Build();
    }

    public IConfiguration Configuration { get; }

    

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
      string conString = Configuration.GetConnectionString("Default");
      
      services.AddDbContext<FavNewsContext>
          (opts => opts.UseSqlServer(conString));
      services.AddScoped<DbContext>(sp => sp.GetService<FavNewsContext>());
      services.AddTransient<IDataRepository, FavNewsManager>();
      services.AddCors();
      services.AddMvc();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IHostingEnvironment env)
    {
      if (env.IsDevelopment())
      {
        app.UseDeveloperExceptionPage();
      }
      app.UseDefaultFiles();
      app.UseStaticFiles();
      app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
      app.UseMvc();
    }
  }
}
