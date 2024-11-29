using API.Extensions;
using API.Middleware;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Persistence;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers(opt => 
{ // by doing the ff every contrllers end points need Authorization unless it is [AllowAnonymous]
    var policy = new AuthorizationPolicyBuilder().RequireAuthenticatedUser().Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});
builder.Services.AddApplicationservices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);


var app = builder.Build();

// Configure the HTTP request pipeline.   ~~~ OR MIDDLEWARE
app.UseMiddleware<ExceptionMiddleware>();
if (app.Environment.IsDevelopment())
{
    //app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
    
}


app.UseCors("CorsPolicy");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

// app.UseHttpsRedirection();

//*** add codes to migrate and seed data to the necessary tables
using var scope = app.Services.CreateScope();  //the whole injected services are availabel here 

var servises = scope.ServiceProvider;  //from whole injected services pick desire service

try
{   
    var context = servises.GetRequiredService<DataContext>(); // pick the right servie(DataContext) to perform the task
    var userManager = servises.GetRequiredService<UserManager<AppUser>>();
      await context.Database.MigrateAsync();
     await Seed.SeedData(context,userManager );
}
catch (Exception ex)
{
    
    var logger = servises.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurd during migration!");
}



app.Run();

 
