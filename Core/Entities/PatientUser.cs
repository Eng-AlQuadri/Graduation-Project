namespace Core.Entities;

public class PatientUser : BaseEntity
{
    public int AppUserId { get; set; }

    public AppUser AppUser { get; set; } = null!;
    public ICollection<Order> Orders { get; set; } = [];
    public ICollection<Invoice> Invoices { get; set; } = [];
}