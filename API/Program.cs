
using API.Extensions;
using API.Middleware;
using Core.Entities;
using Core.Interfaces;
using Infrastructure.Data;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddOpenApi();

builder.Services.AddHttpContextAccessor();

builder.Services.AddApplicationServices(builder.Configuration);

builder.Services.AddIdentityService(builder.Configuration);

builder.Services.AddControllers();

builder.Services.AddSignalR();

builder.Services.AddCors();


var app = builder.Build();

// data seeder
using (var scope = app.Services.CreateScope())
{
    var services = scope.ServiceProvider;

    var retries = 5;

    while(retries > 0)
    {
        try
        {
            var context = services.GetRequiredService<DataContext>();
            var userManager = services.GetRequiredService<UserManager<AppUser>>();
            var roleManager = services.GetRequiredService<RoleManager<AppRole>>();
            var unitOfWork = services.GetRequiredService<IUnitOfWork>();

            await context.Database.MigrateAsync();
            await Seeder.SeedUsers(userManager, roleManager, unitOfWork);

            retries = 0;
        }
        catch (MySqlConnector.MySqlException)
        {
            retries--;
            await Task.Delay(5000); 
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();

            logger.LogError(ex, "An error occured while seeding database");

            retries--;

            await Task.Delay(5000);
        }
    }
}


app.UseMiddleware<ExceptionMiddleware>();

app.UseHttpsRedirection();

app.UseRouting();

app.UseStaticFiles();

app.UseCors(x => x
    .AllowAnyHeader()
    .AllowAnyMethod()
    .AllowCredentials()
    .WithOrigins("http://localhost:4200")
    );

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
