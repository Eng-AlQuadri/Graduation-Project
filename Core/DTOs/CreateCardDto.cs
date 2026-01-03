using System.ComponentModel.DataAnnotations;

namespace Core.DTOs;

public class CreateCardDto
{
    [Required]
    public string CardNo { get; set; } = null!;

    [Required]
    public int CompanyId { get; set; }

    [Required]
    public DateTime Expiry { get; set; }
}