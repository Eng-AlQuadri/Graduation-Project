namespace Core.Entities;

public class Order : BaseEntity
{
    public DateTime OrderDate { get; set;}
    public int PatientId { get; set; }
    public string Address { get; set; } = null!;
    public bool? Approved { get; set; }
    public DateTime? ApprovalTime { get; set; }
    public string? PrescriptionUrl { get; set; }
    public PatientUser Patient { get; set;} = null!;
    public ICollection<OrderDetails> OrderDetails { get; set; } = new List<OrderDetails>();
}