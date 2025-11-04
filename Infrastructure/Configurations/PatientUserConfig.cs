using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class PatientUserConfig : IEntityTypeConfiguration<PatientUser>
{
    public void Configure(EntityTypeBuilder<PatientUser> builder)
    {
        builder
            .HasOne(x => x.AppUser)
            .WithOne()
            .HasForeignKey<PatientUser>(x => x.AppUserId);

        builder
            .Property(x => x.Id)
            .ValueGeneratedNever();

        builder
            .ToTable("Patients");
    }
}