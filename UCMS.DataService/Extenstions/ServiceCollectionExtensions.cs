using System.Reflection;
using UCMS.DataService.Repositories.Implementation;
using UCMS.DataService.Repositories.Interface;
using UCMS.DataService.Repositories.ModelRepository;
using UCMS.DataService.Repositories.Partial;
using UCMS.Models.DbModels;

namespace UCMS.DataService.Extenstions
{
    public static class ServiceCollectionExtensions
    {
        public static IServiceCollection AddRepositories(this IServiceCollection services)
        {
            // Register the generic repository type
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            // Get all entity types from UCMS.Models.DbModels namespace
            var entityTypes = Assembly.GetAssembly(typeof(User))
                .GetTypes()
                .Where(t => t.Namespace == "UCMS.Models.DbModels" &&
                           !t.IsAbstract &&
                           !t.IsInterface)
                .ToList();

            // Register specific repository implementations if needed
            foreach (var entityType in entityTypes)
            {
                // You can add specialized repositories for specific entities if needed
                // For example:
                // if (entityType == typeof(User))
                // {
                //     services.AddScoped<IUserRepository, UserRepository>();
                // }

                if (entityType == typeof(User))
                {
                     services.AddScoped<IRepository<User>, UserRepository>();
                }
                if(entityType == typeof(Site))
                {
                    services.AddScoped<IRepository<Site>, SiteRepository>();
                }
            }

            return services;
        }
    }
}
