namespace Core.DTOs;

public class OrderDto
{
    public int Id { get; set;}
    public DateTime OrderDate { get; set;}
    public int PatientId { get; set;}
    public string PatientName { get; set; } = null!;
    public string Address { get; set; } = null!;
    public bool? Approved { get; set; }
    public DateTime? ApprovalTime { get; set; }
    public string? PrescriptionUrl { get; set; }
    public decimal TotalPrice { get; set; }
    public List<OrderDetailsDto> OrderDetails { get; set; } = [];

}