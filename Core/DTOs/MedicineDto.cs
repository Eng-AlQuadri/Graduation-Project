namespace Core.DTOs;

public class MedicineDto
{
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Packing { get; set; }
    public string? SupplierName { get; set; }
    public int? SupplierId { get; set; }
    public int Stock { get; set; }
    public DateTime ExpiryDate { get; set; }
    public decimal Price { get; set; }
}
