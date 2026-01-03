using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications;

public class PatientSpecification : BaseSpecefication<PatientUser>
{
    private PatientSpecification() : this(null) { }

    private PatientSpecification(Expression<Func<PatientUser, bool>>? expression) : base(expression) { }

    public static PatientSpecification GetFullPatientData(int patientId)
    {
        var spec = new PatientSpecification(x => x.Id == patientId);

        spec.AddInclude(x => x.AppUser);

        return spec;
    }

    public static PatientSpecification GetAllPatients(PatientSpecParams patientSpecParams)
    {
        var spec = new PatientSpecification();

        spec.AddInclude(x => x.AppUser);

        spec.ApplyPaging(patientSpecParams.PageSize * (patientSpecParams.PageIndex - 1), patientSpecParams.PageSize);

        return spec;
    }

    public static PatientSpecification GetAllPatientsByDoctor()
    {
        var spec = new PatientSpecification();

        spec.AddInclude(x => x.AppUser);

        return spec;
    }
}