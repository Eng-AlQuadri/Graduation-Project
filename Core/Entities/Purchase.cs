namespace Core.Entities;

public class Purchase : BaseEntity
{
    public int Quantity { get; set; }
    public DateTime PurchaseTime { get; set; }
    public decimal TotalPrice { get; set; }
    public int MedicineId { get; set; }
    public int SupplierId { get; set; }
    public Medicine Medicine { get; set; } = null!;
    public SupplierUser Supplier { get; set; } = null!;
}
