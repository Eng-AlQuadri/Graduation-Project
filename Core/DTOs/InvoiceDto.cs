namespace Core.DTOs;

public class InvoiceDto
{
    public int Id { get; set;}
    public DateTime InvoiceDate { get; set;}
    public decimal TotalPrice { get; set;}
    public string PatientName { get; set;} = string.Empty;
    public List<InvoiceDetailDto> InvoiceDetails { get; set; } = new List<InvoiceDetailDto>();
}
