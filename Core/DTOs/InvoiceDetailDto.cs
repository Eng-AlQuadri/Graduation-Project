namespace Core.DTOs;

public class InvoiceDetailDto
{
    public string MedicineName { get; set; }  = string.Empty;
    public int Quantity { get; set; } 
    public decimal Price { get; set; }
}
