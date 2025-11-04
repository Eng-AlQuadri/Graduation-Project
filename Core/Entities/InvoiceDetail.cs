namespace Core.Entities;

public class InvoiceDetail : BaseEntity
{
    public int InvoiceId { get; set; }
    public int MedicineId { get; set; }
    public int Quantity { get; set; } 
    public decimal TotalPrice { get; set; }
    public Invoice Invoice { get; set; } = null!;
    public Medicine Medicine { get; set; } = null!;
}
