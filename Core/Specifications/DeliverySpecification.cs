using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications;

public class DeliverySpecification : BaseSpecefication<Delivery>
{
    private DeliverySpecification() : this(null) { }

    private DeliverySpecification(Expression<Func<Delivery, bool>>? expression) : base(expression) { }

    public static DeliverySpecification GetAllDeliveries(DeliverySpecParams deliverySpecParams)
    {
        var spec = new DeliverySpecification();

        spec.AddInclude(x => x.Order);

        spec.AddInclude(x => x.Patient);

        spec.AddInclude(x => x.DeliveryWorker);

        spec.ApplyPaging(deliverySpecParams.PageSize * (deliverySpecParams.PageIndex - 1), deliverySpecParams.PageSize);

        return spec;
    }

    public static DeliverySpecification GetAllDeliveriesByPatient(DeliverySpecParams deliverySpecParams, int patinetId)
    {
        var spec = new DeliverySpecification(x => x.PatientId == patinetId);

        spec.AddInclude(x => x.Order);

        spec.AddInclude(x => x.DeliveryWorker);

        spec.ApplyPaging(deliverySpecParams.PageSize * (deliverySpecParams.PageIndex - 1), deliverySpecParams.PageSize);

        return spec;
    }
}