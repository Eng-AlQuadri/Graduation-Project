using Core.DTOs;

namespace Core.Interfaces;

public interface IAccountService
{
    public Task<ApiResponse> Login(LoginDto loginDto);
    public Task<ApiResponse> Register(RegisterDto registerDto);
    public Task<ApiResponse> Refresh();
    public Task<ApiResponse> Logout();
}