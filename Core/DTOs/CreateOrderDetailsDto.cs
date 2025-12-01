using System.Text.Json.Serialization;

namespace Core.DTOs;

public class CreateOrderDetailsDto
{
    public string MedicineName { get; set; } = null!;
    [JsonPropertyName("quantity")]
    public int Quantity { get; set; }
    [JsonPropertyName("medicineId")]
    public int MedicineId { get; set; }
}

