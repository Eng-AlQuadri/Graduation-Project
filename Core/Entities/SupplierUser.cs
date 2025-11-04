namespace Core.Entities;

public class SupplierUser : BaseEntity
{
    public int AppUserId { get; set; }
    public AppUser AppUser { get; set; } = null!;
    public ICollection<Medicine> Medicines { get; set; } = [];
    public ICollection<Purchase> Purchases { get; set; } = [];
}
