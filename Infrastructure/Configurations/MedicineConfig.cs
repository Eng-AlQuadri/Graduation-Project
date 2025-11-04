using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class MedicineConfiguration : IEntityTypeConfiguration<Medicine>
{
    public void Configure(EntityTypeBuilder<Medicine> builder)
    {
        builder
            .HasOne(m => m.Supplier)
            .WithMany(m => m.Medicines)
            .HasForeignKey(m => m.SupplierId)
            .OnDelete(DeleteBehavior.SetNull)
            .IsRequired(false);

        builder
            .Property(x => x.Price)
            .HasColumnType("decimal(18,2)");
    }
}
