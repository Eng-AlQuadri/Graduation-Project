using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications;

public class DoctorSpecification : BaseSpecefication<DoctorUser>
{
    private DoctorSpecification() : this(null) { }

    private DoctorSpecification(Expression<Func<DoctorUser, bool>>? expression) : base(expression) { }

    public static DoctorSpecification GetFullDoctorData(int doctorId)
    {
        var spec = new DoctorSpecification(x => x.Id == doctorId);

        spec.AddInclude(x => x.AppUser);

        return spec;
    }

    public static DoctorSpecification GetAllDoctors(DoctorSpecParams doctorSpecParams)
    {
        var spec = new DoctorSpecification();

        spec.AddInclude(x => x.AppUser);

        spec.ApplyPaging(doctorSpecParams.PageSize * (doctorSpecParams.PageIndex - 1), doctorSpecParams.PageSize);

        return spec;
    }
}