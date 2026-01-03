namespace Core.Entities;

public class InsuranceCompany : BaseEntity
{
    public string CompanyName { get; set; } = null!;
    public decimal Discount { get; set; }

    public InsuranceCard? InsuranceCard { get; set; }
}