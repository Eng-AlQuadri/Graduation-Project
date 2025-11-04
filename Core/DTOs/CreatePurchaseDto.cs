namespace Core.DTOs;

public class CreatePurchaseDto
{
    public int Quantity { get; set; }
    public int SupplierId { get; set; }
    public int MedicineId { get; set; }
}
