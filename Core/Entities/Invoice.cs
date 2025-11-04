namespace Core.Entities;

public class Invoice : BaseEntity
{
    public DateTime InvoiceDate { get; set;}
    public int PatientId { get; set;}
    public PatientUser Patient { get; set;} = null!;
    public ICollection<InvoiceDetail> InvoiceDetails { get; set; } = new List<InvoiceDetail>();
}
