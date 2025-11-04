using API.Extensions;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Helpers;

public class LogUserActivity : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var resultContext = await next();

        if (!resultContext.HttpContext.User.Identity!.IsAuthenticated) return;

        var userId = resultContext.HttpContext.User.GetUserId();

        var userManager = resultContext.HttpContext.RequestServices.GetService<UserManager<AppUser>>();

        if (userManager is null) return;

        var user = await userManager.GetUserById(userId);

        if (user is null) return;

        user.LastActive = DateTime.UtcNow;

        await userManager.UpdateAsync(user);
    }
}