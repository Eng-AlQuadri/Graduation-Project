namespace Core.DTOs;

public class SupplierDto
{
    public int Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public ICollection<MedicineDto> Medicines { get; set;} = new List<MedicineDto>();
    public ICollection<PurchaseDto> Purchases { get; set;} = new List<PurchaseDto>();
}
