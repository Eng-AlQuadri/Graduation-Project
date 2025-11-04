using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class InvoiceDetailConfiguration : IEntityTypeConfiguration<InvoiceDetail>
{
    public void Configure(EntityTypeBuilder<InvoiceDetail> builder)
    {
        builder
            .HasOne(x => x.Invoice)
            .WithMany(x => x.InvoiceDetails)
            .HasForeignKey(x => x.InvoiceId)
            .OnDelete(DeleteBehavior.NoAction)
            .IsRequired();

        builder
            .HasOne(x => x.Medicine)
            .WithMany(x => x.InvoiceDetails)
            .HasForeignKey(x => x.MedicineId)
            .OnDelete(DeleteBehavior.NoAction)
            .IsRequired();

        builder
            .Property(x => x.TotalPrice)
            .HasColumnType("decimal(18,2)");
    }
}
