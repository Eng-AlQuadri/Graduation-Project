
using System.Text.Json;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class Seeder 
{
    public static async Task SeedUsers(UserManager<AppUser> userManager,
        RoleManager<AppRole> roleManager, IUnitOfWork unitOfWork)
    {
        if (await userManager.Users.AnyAsync()) return;

        var path = Path.Combine("..", "infrastructure", "Data", "UserSeedData.json");

        var userData = await System.IO.File.ReadAllTextAsync(path);

        var users = JsonSerializer.Deserialize<List<AppUser>>(userData);

        if (users is null) return;

        var roles = new List<AppRole>
        {
            new AppRole {Name = "Patient"},
            new AppRole {Name = "Supplier"},
            new AppRole {Name = "Admin"},
            new AppRole {Name = "Delivery"},
            new AppRole {Name = "Doctor"}
        };

        foreach (var role in roles)
        {
            await roleManager.CreateAsync(role);
        }

        foreach (var user in users)
        {
            user.UserName = user.UserName!.ToLower();

            await userManager.CreateAsync(user,"Pa$$w0rd");

            await userManager.AddToRoleAsync(user, "Patient");

            var patientUser = new PatientUser
            {
                Id = user.Id,
                AppUserId = user.Id
            };

            unitOfWork.Repository<PatientUser>().Add(patientUser);
        }

        var adminAppUser = new AppUser
        {
            UserName = "admin",
            Email = "admin@admin.com",
            PhoneNumber = "8556478965"
        };

        await userManager.CreateAsync(adminAppUser, "Pa$$w0rd");
        
        await userManager.AddToRoleAsync(adminAppUser, "Admin");

        var admin = new AdminUser
        {
            Id = adminAppUser.Id,
            AppUserId = adminAppUser.Id,
            AppUser = adminAppUser
        };

        unitOfWork.Repository<AdminUser>().Add(admin);


        var supplierAppUser = new AppUser
        {
            UserName = "supplier",
            Email = "supplier@supplier.com",
            PhoneNumber = "5462899176"
        };

        await userManager.CreateAsync(supplierAppUser, "Pa$$w0rd");

        await userManager.AddToRoleAsync(supplierAppUser, "Supplier");

        var supplier = new SupplierUser
        {
            Id = supplierAppUser.Id,
            AppUserId = supplierAppUser.Id,
            AppUser = supplierAppUser
        };

        unitOfWork.Repository<SupplierUser>().Add(supplier);

        await unitOfWork.Complete();
    }
}

