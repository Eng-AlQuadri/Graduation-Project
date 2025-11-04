using System.Security.Authentication;
using System.Security.Claims;
using Core.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Extensions;

public static class ClaimsPrincipleExtensions
{
    public static int GetUserId(this ClaimsPrincipal user)
    {
        return int.Parse(user.FindFirst(ClaimTypes.NameIdentifier)!.Value);
    }

    public static async Task<AppUser> GetUserById(this UserManager<AppUser> userManager, int userId)
    {
        var userToReturn = await userManager.Users.SingleOrDefaultAsync(x => x.Id == userId)
            ?? throw new AuthenticationException("User not found");

        return userToReturn;
    }
}