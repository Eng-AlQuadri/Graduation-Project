using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class PurchaseConfiguration : IEntityTypeConfiguration<Purchase>
{
    public void Configure(EntityTypeBuilder<Purchase> builder)
    {
        builder
            .HasOne(x => x.Medicine)
            .WithMany(x => x.Purchases)
            .HasForeignKey(x => x.MedicineId)
            .OnDelete(DeleteBehavior.Cascade)
            .IsRequired();

        builder
            .HasOne(x => x.Supplier)
            .WithMany(x => x.Purchases)
            .HasForeignKey(x => x.SupplierId)
            .OnDelete(DeleteBehavior.Restrict)
            .IsRequired();

        builder
            .Property(x => x.TotalPrice)
            .HasColumnType("decimal(18,2)");
    }
}
