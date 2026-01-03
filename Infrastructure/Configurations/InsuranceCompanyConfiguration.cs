using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class InsuranceCompanyConfig : IEntityTypeConfiguration<InsuranceCompany>
{
    public void Configure(EntityTypeBuilder<InsuranceCompany> builder)
    {
        builder
            .Property(x => x.Discount)
            .HasColumnType("decimal(18,2)");

        builder
            .ToTable("InsuranceCompanies");
    }
}