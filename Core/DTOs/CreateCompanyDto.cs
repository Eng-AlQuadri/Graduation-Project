using System.ComponentModel.DataAnnotations;

namespace Core.DTOs;

public class CreateCompanyDto
{
    [Required]
    public string CompanyName { get; set; } = null!;
    
    [Required]
    public decimal Discount { get; set; }
}