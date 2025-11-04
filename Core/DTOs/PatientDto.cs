namespace Core.DTOs;

public class PatientDto
{
    public int Id { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public ICollection<InvoiceDto> Invoices { get; set; } = [];
}
