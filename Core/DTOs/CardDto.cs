namespace Core.DTOs;

public class CardDto
{
    public DateTime Expiry { get; set; }
    public string CardNo { get; set; } = null!;
    public int CompanyId { get; set; }
    public int PatientId { get; set; }
    public string PatientName { get; set; } = null!;
    public int Id { get; set; }
}