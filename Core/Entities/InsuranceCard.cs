namespace Core.Entities;

public class InsuranceCard : BaseEntity
{
    public DateTime Expiry { get; set; }
    public string CardNo { get; set; } = null!;
    public int CompanyId { get; set; }
    public int PatientId { get; set; }
    public string PatientName { get; set; } = null!;

    public PatientUser Patient { get; set; } = null!;
    public InsuranceCompany InsuranceCompany { get; set; } = null!;
}