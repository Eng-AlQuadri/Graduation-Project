namespace Core.Entities;

public class DeliveryUser : BaseEntity
{
    public int AppUserId { get; set; }

    public AppUser AppUser { get; set; } = null!;
}