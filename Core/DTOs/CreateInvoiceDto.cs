using API.DTOs;

namespace Core.DTOs;

public class CreateInvoiceDto
{
    public int Quantity { get; set; }
    public int PatientId { get; set; }
    
    public List<CreateInvoiceDetailDto> InvoiceDetails { get; set; } = [];
}
