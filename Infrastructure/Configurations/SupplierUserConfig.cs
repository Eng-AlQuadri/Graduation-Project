using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class SupplierUserConfiguration : IEntityTypeConfiguration<SupplierUser>
{
    public void Configure(EntityTypeBuilder<SupplierUser> builder)
    {
        builder
            .ToTable("Suppliers")
            .HasOne(x => x.AppUser)
            .WithOne()
            .HasForeignKey<SupplierUser>(x => x.AppUserId);
    }
}
