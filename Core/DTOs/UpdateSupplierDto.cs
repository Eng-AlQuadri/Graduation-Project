namespace Core.DTOs;

public class UpdateSupplierDto
{
    public int UpdateSupplierId { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
}
