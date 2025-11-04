using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class OrderDetailsConfiguration : IEntityTypeConfiguration<OrderDetails>
{
    public void Configure(EntityTypeBuilder<OrderDetails> builder)
    {
        builder
            .Property(x => x.UnitPrice)
            .HasColumnType("decimal(18,2)");

        builder
            .HasOne(x => x.Medicine)
            .WithMany(x => x.OrderDetails)
            .HasForeignKey(x => x.MedicineId)
            .IsRequired();

        builder
            .HasOne(x => x.Order)
            .WithMany(x => x.OrderDetails)
            .HasForeignKey(x => x.OrderId)
            .IsRequired();

        builder
            .ToTable("OrderDetails");
    }
}