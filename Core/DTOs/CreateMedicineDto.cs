namespace Core.DTOs;

public class CreateMedicineDto
{
    public string Name { get; set; } = null!;
    public string Packing { get; set; } = null!;
    public int Stock { get; set; }
    public DateTime ExpiryDate { get; set; }
    public decimal Price { get; set; }
}
