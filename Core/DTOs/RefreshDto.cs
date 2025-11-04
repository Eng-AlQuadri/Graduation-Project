using System.ComponentModel.DataAnnotations;

namespace Core.DTOs;

public class RefreshDto
{
    [Required]
    public string RefreshToken { get; set; } = null!;
}