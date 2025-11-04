using System.ComponentModel.DataAnnotations;

namespace Core.DTOs;

public class LogoutDto
{
    [Required]
    public string RefreshToken { get; set; } = null!;
}