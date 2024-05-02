// using System.Text;
// using API.Services;
// using Domain;
// // using Infrastructure.Security;
// // using Microsoft.AspNetCore.Authentication.JwtBearer;
// using Microsoft.AspNetCore.Authorization;
// using Microsoft.AspNetCore.Identity;
// using Microsoft.IdentityModel.Tokens;
// using Persistence;

// namespace API.Extensions
// {
//     public static class IdentityServiceExtensions
//     {

//         public static IServiceCollection AddIdentityServices(this IServiceCollection services,
//              IConfiguration config)
//         {

//           /*
//                 IdentityOptions(opt) includes --> UserOptions && -- PasswordOptions

//                 AddSignInManager<SignInManager<AppUser>>() && AddUserManager<UserManager<AppUser>>() are included when you call AddIdentity in ASP.NET Core.
//                 * both SignInManager and UserManager are included when you call AddIdentity in ASP.NET Core.
//           */

//            services.AddIdentity<AppUser, IdentityRole>(opt =>
//            {
             
//                opt.Password.RequireNonAlphanumeric = false;
//                opt.User.RequireUniqueEmail = true;

//            })
//            .AddEntityFrameworkStores<DataContext>()
//            .AddDefaultTokenProviders();


//             var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("TokenKey"));


//             services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//             .AddJwtBearer(opt =>
//             {
//                 opt.TokenValidationParameters = new TokenValidationParameters
//                 {

//                     ValidateIssuerSigningKey = true,
//                     IssuerSigningKey = key,
//                     ValidateIssuer = false,
//                     ValidateAudience = false,
//                 };
//             });

//                    services.AddAuthorization(opt =>
//             {
//                 opt.AddPolicy("IsActivityHost", policy =>
//                 {
//                     policy.Requirements.Add(new IsHostRequirement());
//                 });
//             });
               
//             services.AddTransient<IAuthorizationHandler, IsHostRequirementHandler>();
//             services.AddScoped<TokenService>();

//             return services;
//         }

//     }
// }