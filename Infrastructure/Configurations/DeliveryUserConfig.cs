using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class DeliveryUserConfig : IEntityTypeConfiguration<DeliveryUser>
{
    public void Configure(EntityTypeBuilder<DeliveryUser> builder)
    {
        builder
            .HasOne(x => x.AppUser)
            .WithOne()
            .HasForeignKey<DeliveryUser>(x => x.AppUserId);

        builder
            .Property(x => x.Id)
            .ValueGeneratedNever();

        builder
            .ToTable("Delivery_Workers");
    }
}