using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class OrderConfiguration : IEntityTypeConfiguration<Order>
{
    public void Configure(EntityTypeBuilder<Order> builder)
    {
        builder
            .Property(x => x.OrderDate)
            .HasConversion(
                d => d.ToUniversalTime(),
                d => DateTime.SpecifyKind(d, DateTimeKind.Utc)
            );

        builder
            .Property(x => x.ApprovalTime)
            .HasConversion(
                d => d.HasValue ? d.Value.ToUniversalTime() : (DateTime?)null,
                d => d.HasValue ? DateTime.SpecifyKind(d.Value, DateTimeKind.Utc) : (DateTime?)null
            );

        builder
            .HasOne(x => x.Patient)
            .WithMany(x => x.Orders)
            .HasForeignKey(x => x.PatientId)
            .IsRequired();

        builder
            .ToTable("Orders");
    }
}