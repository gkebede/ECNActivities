using Application.Activities;
using Microsoft.EntityFrameworkCore;
using Persistence;

using Application.core;
using FluentValidation;
using FluentValidation.AspNetCore;
using Application.Interfaces;
using Infrastructure.Security;

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
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();

            //  services.AddMediatR(typeof(List.Handler));

            //*NB* the ff are to accesse the Repositery patern of - IUserAccessor, UserAccessor
            // && HttpContext throgh AddHttpContextAccessor
             services.AddHttpContextAccessor();
             services.AddScoped<IUserAccessor, UserAccessor>();


            return services;

        }

    }
}