namespace Core.DTOs;

public class UserDto
{
    public string AccessToken { get; set; } = null!;
    public string RefreshToken { get; set; } = null!;
    public string UserName { get; set; } = null!;
}