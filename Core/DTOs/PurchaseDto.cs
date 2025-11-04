namespace Core.DTOs;

public class PurchaseDto
{
    public int Id { get; set; }
    public int Quantity { get; set; }
    public DateTime PurchaseTime { get; set; }
    public decimal TotalPrice { get; set; }
    public string? MedicineName { get; set; }
    public string? SupplierName { get; set; }
}
