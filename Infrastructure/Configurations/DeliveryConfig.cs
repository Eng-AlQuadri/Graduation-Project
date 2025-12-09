using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class DeliveryConfig : IEntityTypeConfiguration<Delivery>
{
    public void Configure(EntityTypeBuilder<Delivery> builder)
    {
        builder
            .Property(x => x.CreatedAt)
            .HasConversion(
                d => d.ToUniversalTime(),
                d => DateTime.SpecifyKind(d, DateTimeKind.Utc)
            );

        builder
            .Property(x => x.CompletedAt)
            .HasConversion(
                d => d.HasValue ? d.Value.ToUniversalTime() : (DateTime?)null,
                d => d.HasValue ? DateTime.SpecifyKind(d.Value, DateTimeKind.Utc) : (DateTime?)null
            );

        builder
            .HasOne(x => x.DeliveryWorker)
            .WithMany(x => x.Deliveries)
            .HasForeignKey(x => x.DeliveryWorkerId)
            .IsRequired(true);

        builder
            .HasOne(x => x.Patient)
            .WithMany(x => x.Deliveries)
            .HasForeignKey(x => x.PatientId)
            .IsRequired(true);

        builder
            .HasOne(x => x.Order)
            .WithOne(x => x.Delivery)
            .HasForeignKey<Delivery>(x => x.OrderId)
            .IsRequired(false);

        builder
            .ToTable("Deliveries");
    }
}