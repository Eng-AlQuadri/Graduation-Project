namespace Core.DTOs;

public class OrderDetailsDto
{
    public string MedicineName { get; set; } = null!;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice => UnitPrice * Quantity;
}