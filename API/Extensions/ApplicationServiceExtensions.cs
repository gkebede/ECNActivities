using Application.Activities;
// using Application.Activities.core;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
// using FluentValidation;
// using FluentValidation.AspNetCore;
// using Application.Interfaces;
// using Infrastructure.Security;
using Application.core;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationservices(
            this IServiceCollection services, IConfiguration config)
        {

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            services.AddDbContext<DataContext>(option => option.UseSqlServer(config.GetConnectionString("DefaultConnection")));
            services.AddCors(options =>
            {

                options.AddPolicy("CorsPolicy", policy =>
                {
                    policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("*");
                    //policy.AllowAnyMethod().AllowAnyHeader().WithOrigins("http://localhost:3000");
                });

            });

            services.AddMediatR(config => config.RegisterServicesFromAssemblies(typeof(List.Handler).Assembly));
           services.AddAutoMapper(typeof(MappingProfiles).Assembly);


             //services.AddMediatR(typeof(List.Handler));
             services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            // services.AddFluentValidationAutoValidation();
            // services.AddValidatorsFromAssemblyContaining<Create>();
            // services.AddHttpContextAccessor();
            // services.AddScoped<IUserAccessor, UserAccessor>();


            return services;

        }

    }
}