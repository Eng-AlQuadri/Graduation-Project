using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications;

public class InvoiceSpecification : BaseSpecefication<Invoice>
{
    private InvoiceSpecification() : this(null) { }
    private InvoiceSpecification(Expression<Func<Invoice, bool>>? expression) : base(expression) { }

    public static InvoiceSpecification GetAllInvoices(InvoiceSpecParams specParams)
    {
        var spec = new InvoiceSpecification();

        spec.AddInclude(x => x.Patient);

        spec.AddInclude(x => x.InvoiceDetails);

        spec.ApplyPaging(specParams.PageSize * (specParams.PageIndex - 1), specParams.PageSize);

        return spec;
    }

    public static InvoiceSpecification GetInvoicesByPatient(int patientId, InvoiceSpecParams specParams)
    {
        var spec = new InvoiceSpecification(x => x.PatientId == patientId);

        spec.AddInclude(x => x.Patient);

        spec.AddInclude(x => x.InvoiceDetails);

        spec.ApplyPaging(specParams.PageSize * (specParams.PageIndex - 1), specParams.PageSize);

        return spec;
    }
}