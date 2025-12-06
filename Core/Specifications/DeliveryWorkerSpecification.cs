using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications;

public class DeliveryWorkerSpecification : BaseSpecefication<DeliveryUser>
{
    private DeliveryWorkerSpecification () : this(null) { }

    private DeliveryWorkerSpecification(Expression<Func<DeliveryUser, bool>>? expression) : base(expression) { }

    public static DeliveryWorkerSpecification GetFullDeliveryWorkerData(int deliveryWorkerId)
    {
        var spec = new DeliveryWorkerSpecification(x => x.Id == deliveryWorkerId);

        spec.AddInclude(x => x.AppUser);

        return spec;
    }

    public static DeliveryWorkerSpecification GetAllDeliveryWorkers(DeliveryWorkerSpecParams deliveryWorkerSpecParams)
    {
        var spec = new DeliveryWorkerSpecification();

        spec.AddInclude(x => x.AppUser);

        spec.ApplyPaging(deliveryWorkerSpecParams.PageSize * (deliveryWorkerSpecParams.PageIndex - 1), deliveryWorkerSpecParams.PageSize);

        return spec;
    }
}