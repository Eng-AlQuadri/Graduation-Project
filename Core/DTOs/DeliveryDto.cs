namespace Core.DTOs;

public class DeliveryDto
{
    public int DeliveryId { get; set; }
    public int OrderId { get; set; }

    public int DeliveryWorkerId { get; set; }

    public int PatientId { get; set; }

    public DateTime CreatedAt { get; set; }
    public DateTime? CompletedAt { get; set; }

    public int? Status { get; set; }
}