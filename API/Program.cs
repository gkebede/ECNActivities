using Microsoft.EntityFrameworkCore;
using Persistence;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();
                                                                                                                    
builder.Services.AddDbContext<DataContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));


builder.Services.AddCors(options =>
            {

                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("*");
                    //policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });

            });

var app = builder.Build();

// Configure the HTTP request pipeline.   ~~~ OR MIDDLEWARE
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// app.UseAuthorization();
app.MapControllers();

app.UseCors("CorsPolicy");

// app.UseHttpsRedirection();

//*** added codes to migrate and seed data to the necessary tables
using var scope = app.Services.CreateScope();  //the whole injected services are availabel here 

var servises = scope.ServiceProvider;  //from whole injected services pick desire service

try
{   
    var context = servises.GetRequiredService<DataContext>(); // pick the right servie(DataContext) to perform the task
    // var userManager = servises.GetRequiredService<UserManager<AppUser>>();
      await context.Database.MigrateAsync();
     await Seed.SeedData(context);
}
catch (Exception ex)
{
    
    var logger = servises.GetRequiredService<ILogger<Program>>();
    logger.LogError(ex, "An error occurd during migration!");
}



app.Run();

 
