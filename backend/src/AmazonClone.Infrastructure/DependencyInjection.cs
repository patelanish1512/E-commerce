using AmazonClone.Infrastructure.Data;
using AmazonClone.Infrastructure.Data.Repositories;
using AmazonClone.Infrastructure.Identity;
using AmazonClone.Domain.Interfaces;
using AmazonClone.Application.Interfaces;
using AmazonClone.Domain.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Amazon.S3;
using AmazonClone.Infrastructure.Storage;

namespace AmazonClone.Infrastructure
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseInMemoryDatabase("AmazonCloneDb"));

            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            
            services.AddIdentityCore<ApplicationUser>()
                .AddRoles<IdentityRole<Guid>>()
                .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddScoped<IIdentityService, IdentityService>();

            services.AddDistributedMemoryCache();

            services.AddDefaultAWSOptions(configuration.GetAWSOptions());
            services.AddAWSService<IAmazonS3>();
            services.AddScoped<IFileStorageService, S3FileStorageService>();

            return services;
        }
    }
}
