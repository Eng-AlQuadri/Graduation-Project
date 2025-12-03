using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Infrastructure.Services;

public class TokenService : ITokenService
{
    private readonly IConfiguration _config;
    private readonly UserManager<AppUser> _userManager;
    private readonly IUnitOfWork _unitOfWork;

    public TokenService(IConfiguration config, UserManager<AppUser> userManager, IUnitOfWork unitOfWork)
    {
        _config = config;
        _userManager = userManager;
        _unitOfWork = unitOfWork;
    }

    public async Task<string> GenerateAccessToken(AppUser user)
    {
        var issuer = _config["JwtConfig:Issuer"]!;

        var audience = _config["JwtConfig:Audience"]!;

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["JwtConfig:Key"]!));

        var tokenValidityMins = _config.GetValue<int>("JwtConfig:TokenValidityMins"!);

        var tokenExpiryTimeStamp = DateTime.UtcNow.AddMinutes(tokenValidityMins);


        var claims = new List<System.Security.Claims.Claim>
        {
            new System.Security.Claims.Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString())
        };

        // add branch to claim later

        var roles = await _userManager.GetRolesAsync(user);

        claims.AddRange(roles.Select(role => new Claim("role", role)));
        
        var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            issuer: issuer,
            audience: audience,
            claims: claims,
            expires: tokenExpiryTimeStamp,
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }


    public async Task<string> GenerateRefreshToken(int userId, string? oldRefreshToken = null)
    {
        var refreshTokenValidityMins = _config.GetValue<int>("JwtConfig:RefreshTokenValidityMins"!);

        if (!string.IsNullOrEmpty(oldRefreshToken))
        {
            var oldTokenSpec = RefreshTokenSpecification.GetRefreshTokenDataByToken(oldRefreshToken);

            var oldToken = await _unitOfWork.Repository<RefreshToken>().GetEntityWithSpec(oldTokenSpec);

            if (oldToken is not null && oldToken.UserId == userId)
            {
                oldToken.Revoked = DateTime.UtcNow;

                _unitOfWork.Repository<RefreshToken>().Update(oldToken);
            }
            else
            {
                throw new Exception("Invalid refresh token or user");
            }
        }

        var refreshToken = new RefreshToken
        {
            RToken = Guid.NewGuid().ToString(),
            Expires = DateTime.UtcNow.AddMinutes(refreshTokenValidityMins),
            UserId = userId,
            Created = DateTime.UtcNow
        };

        _unitOfWork.Repository<RefreshToken>().Add(refreshToken);

        if (await _unitOfWork.Complete()) return refreshToken.RToken;

        return null!;
    }
}