namespace Core.Entities;

public class Delivery : BaseEntity
{
    public int OrderId { get; set; }
    public Order Order { get; set; } = null!;

    public int DeliveryWorkerId { get; set; }
    public DeliveryUser DeliveryWorker { get; set; } = null!;

    public int PatientId { get; set; }
    public PatientUser Patient { get; set; } = null!;

    public DateTime CreatedAt { get; set; }
    public DateTime? CompletedAt { get; set; }

    public int? Status { get; set; }
}