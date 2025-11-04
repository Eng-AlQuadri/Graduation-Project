using System.ComponentModel.DataAnnotations;

namespace Core.DTOs;

public class UpdateMedicineDto
{
    [Required]
    public int UpdateMedicineId { get; set; }
    [Required]
    public string Name { get; set; } = null!;
    [Required]
    public string Packing { get; set; } = null!;
    [Required]
    public int Stock { get; set; }
    [Required]
    public DateTime ExpiryDate { get; set; }
    [Required]
    public int Price { get; set; }
}
