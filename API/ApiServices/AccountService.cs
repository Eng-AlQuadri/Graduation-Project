using API.Extensions;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.ApiServices;

public class AccountService : BaseService, IAccountService
{
    private readonly IMapper _mapper;
    private readonly ITokenService _tokenService;
    private readonly IUnitOfWork _unitOfWork;
    private readonly UserManager<AppUser> _userManager;
    private readonly SignInManager<AppUser> _signInManager;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public AccountService(ITokenService tokenService, IMapper mapper,
        IUnitOfWork unitOfWork, UserManager<AppUser> userManager,
        SignInManager<AppUser> signInManager, IHttpContextAccessor httpContextAccessor)
    {
        _tokenService = tokenService;
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _userManager = userManager;
        _signInManager = signInManager;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<ApiResponse> Login(LoginDto loginDto)
    {
        var user = await FindUserByEmail(loginDto.Email);

        if (user is null || !await IsPasswordValid(user, loginDto.Password))
        {
            return Response(false, 400, "Incorrect email or password", null);
        }

        var userDto = await CreateUserDto(user);

        return Response(true, 200, null, userDto);
    }

    public async Task<ApiResponse> Logout(string refreshToken)
    {
        var userId = _httpContextAccessor.HttpContext!.User.GetUserId();

        var token = await GetUserRefreshToken(userId, refreshToken);

        if (token is null)
        {
            return Response(true, 200, "User already logged out", null);
        }

        RevokeToken(token);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 200, "Logged out successfully", null)
            : Response(false, 500, "Something went wrong", null);        
    }

    public async Task<ApiResponse> Refresh(string refreshToken)
    {
        var storedToken = await GetValidRefreshToken(refreshToken);

        if (storedToken is null)
        {
            return Response(false, 401, "Invalid or expired refresh token", null);
        }

        if (storedToken.User is null)
        {
            return Response(false, 404, "User not found", null);
        }

        var userDto = await CreateUserDto(storedToken.User, refreshToken);

        return Response(true, 200, null, userDto);
    }

    public async Task<ApiResponse> Register(RegisterDto registerDto)
    {
        if (await UserExists(registerDto.Email))
        {
            return Response(false, 400, "Please use another email", null);
        }

        var user = CreateUserEntity(registerDto);

        var createResult = await _userManager.CreateAsync(user, registerDto.Password);

        if (!createResult.Succeeded)
        {
            return Response(false, 400, null, createResult.Errors);
        }

        var roleResult = await AssignRoleAsync(user, "Patient");

        if (!roleResult.Succeeded)
        {
            return Response(false, 400, null, roleResult.Errors);
        }

        CreatePatientRecord(user);

        var userDto = await CreateUserDto(user);

        var saved = await _unitOfWork.Complete();

        return saved

            ? Response(true, 201, null, userDto)

            : Response(false, 500, "Something went wrong", null);
    }

    private async Task<bool> IsPasswordValid(AppUser user, string password)
    {
        var result = await _signInManager.CheckPasswordSignInAsync(user, password, false);

        return result.Succeeded;
    }

    private async Task<AppUser?> FindUserByEmail(string email)
    {
        return await _userManager.Users.SingleOrDefaultAsync(x => x.Email == email);
    }

    private void RevokeToken(RefreshToken token)
    {
        token.Revoked = DateTime.UtcNow;

        _unitOfWork.Repository<RefreshToken>().Update(token);
    }
    
    private async Task<RefreshToken?> GetUserRefreshToken(int userId, string refreshToken)
    {
        var spec = RefreshTokenSpecification.GetRefreshTokenByUserIdAndToken(userId, refreshToken);

        return await _unitOfWork.Repository<RefreshToken>().GetEntityWithSpec(spec);
    }

    private async Task<RefreshToken?> GetValidRefreshToken(string refreshToken)
    {
        var storedTokenSpec = RefreshTokenSpecification.GetRefreshTokenDataByToken(refreshToken);

        var storedToken = await _unitOfWork.Repository<RefreshToken>().GetEntityWithSpec(storedTokenSpec);

        return storedToken?.IsActive == true ? storedToken : null;
    }

    private async Task<bool> UserExists(string email)
    {
        return await _userManager.Users.AnyAsync(x => x.Email == email);
    }

    private AppUser CreateUserEntity(RegisterDto registerDto)
    {
        var user = _mapper.Map<AppUser>(registerDto);

        user.UserName = registerDto.Username.ToLower();

        user.CreatedAt = DateTime.UtcNow;

        return user;
    }

    private async Task<IdentityResult> AssignRoleAsync(AppUser user, string role)
    {
        return await _userManager.AddToRoleAsync(user, role);
    }

    private void CreatePatientRecord(AppUser user)
    {
        var patient = new PatientUser
        {
            Id = user.Id,
            AppUserId = user.Id,
            AppUser = user
        };

        _unitOfWork.Repository<PatientUser>().Add(patient);
    }

    private async Task<UserDto> CreateUserDto(AppUser user, string? oldRefreshToken = null)
    {
        return new UserDto
        {
            UserName = user.UserName!,
            AccessToken = await _tokenService.GenerateAccessToken(user),
            RefreshToken = await _tokenService.GenerateRefreshToken(user.Id, oldRefreshToken)
        };
    }
}