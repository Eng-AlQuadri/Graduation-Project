namespace Core.Entities;

public class Medicine : BaseEntity
{
    public string Name { get; set; } = null!;
    public string Packing { get; set; } = null!;
    public int Stock { get; set; }
    public DateTime ExpiryDate { get; set; }
    public decimal Price { get; set; }
    public int? SupplierId { get; set; }
    public SupplierUser? Supplier { get; set; }
    public ICollection<InvoiceDetail> InvoiceDetails { get; set; } = new List<InvoiceDetail>();
    public ICollection<Purchase> Purchases { get; set; } = new List<Purchase>();
    public ICollection<OrderDetails>? OrderDetails { get; set; }
}
