using API.Helpers;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class AccountController : BaseApiController
{
    private readonly IAccountService _accountService;

    public AccountController(IAccountService accountService)
    {
        _accountService = accountService;
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto loginDto)
    {
        var response = await _accountService.Login(loginDto);

        return StatusCode(response.StatusCode, response);
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto registerDto)
    {
        var response = await _accountService.Register(registerDto);

        return StatusCode(response.StatusCode, response);
    }

    [HttpPost("logout")]
    public async Task<IActionResult> Logout()
    {
        var response = await _accountService.Logout();

        return StatusCode(response.StatusCode, response);
    }

    [HttpPost("refresh")]
    public async Task<IActionResult> Refresh()
    {
        var response = await _accountService.Refresh();

        return StatusCode(response.StatusCode, response);
    }
}