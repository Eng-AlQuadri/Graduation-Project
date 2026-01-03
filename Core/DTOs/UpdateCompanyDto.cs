using System.ComponentModel.DataAnnotations;

namespace Core.DTOs;

public class UpdateCompanyDto
{
    [Required]
    public string CompanyName { get; set; } = null!;

    [Required]
    public decimal Discount { get; set; }

    [Required]
    public int Id { get; set; }
}