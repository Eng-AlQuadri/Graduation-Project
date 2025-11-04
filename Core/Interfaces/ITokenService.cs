using Core.Entities;

namespace Core.Interfaces;

public interface ITokenService
{
    Task<string> GenerateAccessToken(AppUser user);
    Task<string> GenerateRefreshToken(int userId, string? oldRefreshToken = null);
}