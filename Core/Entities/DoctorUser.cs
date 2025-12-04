namespace Core.Entities;

public class DoctorUser : BaseEntity
{
    public int AppUserId { get; set; }

    public AppUser AppUser { get; set; } = null!;
}