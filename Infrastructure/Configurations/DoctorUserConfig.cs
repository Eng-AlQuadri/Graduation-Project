using Core.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Infrastructure.Configurations;

public class DoctorUserConfig : IEntityTypeConfiguration<DoctorUser>
{
    public void Configure(EntityTypeBuilder<DoctorUser> builder)
    {
        builder
            .HasOne(x => x.AppUser)
            .WithOne()
            .HasForeignKey<DoctorUser>(x => x.AppUserId);

        builder
            .Property(x => x.Id)
            .ValueGeneratedNever();

        builder
            .ToTable("Doctors");
    }
}