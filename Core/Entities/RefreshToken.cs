namespace Core.Entities;

public class RefreshToken : BaseEntity
{
    public int UserId { get; set; }
    public string RToken { get; set; } = string.Empty;
    public DateTime Expires { get; set; }
    public DateTime Created { get; set; }
    public DateTime? Revoked { get; set; }
    public bool IsExpired => DateTime.UtcNow > Expires;
    public bool IsActive => Revoked == null && !IsExpired;

    public AppUser User { get; set; } = null!;
}