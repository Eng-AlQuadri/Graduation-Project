using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class InsuranceCardConfig : IEntityTypeConfiguration<InsuranceCard>
{
    public void Configure(EntityTypeBuilder<InsuranceCard> builder)
    {
        builder
            .Property(x => x.Expiry)
            .HasConversion(
                d => d.ToUniversalTime(),
                d => DateTime.SpecifyKind(d, DateTimeKind.Utc)
            );

        builder
            .HasOne(x => x.Patient)
            .WithOne(x => x.InsuranceCard)
            .HasForeignKey<InsuranceCard>(x => x.PatientId)
            .IsRequired(true);

        builder
            .HasOne(x => x.InsuranceCompany)
            .WithOne(x => x.InsuranceCard)
            .HasForeignKey<InsuranceCard>(x => x.CompanyId)
            .IsRequired(true);

        builder
            .ToTable("InsuranceCards");
    }
}