namespace Core.Entities;

public class OrderDetails : BaseEntity
{
    public int OrderId { get; set; }
    public int MedicineId { get; set; }
    public string MedicineName { get; set; } = null!;
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }
    public decimal TotalPrice => UnitPrice * Quantity;

    public Order Order { get; set; } = null!;
    public Medicine Medicine { get; set; } = null!;
}