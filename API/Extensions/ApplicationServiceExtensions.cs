using API.ApiServices;
using API.Helpers;
using Core.Interfaces;
using Infrastructure.Data;
using Infrastructure.Services;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ApplicationServiceExtension
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection services,
        IConfiguration configuration)
    {
        services.AddScoped<ITokenService, TokenService>();

        services.AddScoped<FileService>();

        services.AddScoped<IUnitOfWork, UnitOfWork>();

        services.AddScoped<IAccountService, AccountService>();

        services.AddScoped<IMedicineService, MedicineService>();

        services.AddScoped<IInvoiceService, InvoiceService>();

        services.AddScoped<IPatientService, PatientService>();

        services.AddScoped<IOrderService, OrderService>();

        services.AddScoped<ISupplierService, SupplierService>();

        services.AddScoped<IPurchaseService, PurchaseService>();

        services.AddScoped<LogUserActivity>();

        services.AddScoped(typeof(IGenericRepository<>), typeof(GenericRepository<>));

        services.AddAutoMapper(typeof(AutoMapperProfiles).Assembly);


        services.AddDbContext<DataContext>(options =>
        {
            var conString = configuration.GetConnectionString("DefaultConnection");

            options.UseMySql(conString, ServerVersion.AutoDetect(conString));
        });

        return services;
    }
}
