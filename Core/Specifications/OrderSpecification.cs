using System.Linq.Expressions;
using Core.Entities;

namespace Core.Specifications;

public class OrderSpecification : BaseSpecefication<Order>
{
    private OrderSpecification() : this(null) { }

    private OrderSpecification(Expression<Func<Order, bool>>? expression) : base(expression) { }

    public static OrderSpecification GetAllOrders(OrderSpecParams orderSpecParams)
    {
        var spec = new OrderSpecification();

        spec.ApplyPaging(orderSpecParams.PageSize * (orderSpecParams.PageIndex - 1), orderSpecParams.PageSize);

        spec.AddInclude(x => x.OrderDetails);

        spec.AddInclude("OrderDetails.Medicine");

        spec.AddInclude(x => x.Patient.AppUser);

        return spec;
    }

    public static OrderSpecification GetOrderById(int orderId)
    {
        var spec = new OrderSpecification(x => x.Id == orderId);

        spec.AddInclude(x => x.OrderDetails);

        spec.AddInclude("OrderDetails.Medicine");

        spec.AddInclude(x => x.Patient.AppUser);

        return spec;
    }

    public static OrderSpecification GetAllOrdersByPatient(OrderSpecParams orderSpecParams, int patientId)
    { 
        var spec = new OrderSpecification(x => x.PatientId == patientId);

        spec.ApplyPaging(orderSpecParams.PageSize * (orderSpecParams.PageIndex - 1), orderSpecParams.PageSize);

        spec.AddInclude(x => x.OrderDetails);

        spec.AddInclude("OrderDetails.Medicine");

        spec.AddInclude(x => x.Patient.AppUser);

        return spec;
    }

    public static OrderSpecification GetAllOrdersByDoctor(OrderSpecParams orderSpecParams, int doctorId)
    { 
        var spec = new OrderSpecification(x => x.DoctorId == doctorId);

        spec.ApplyPaging(orderSpecParams.PageSize * (orderSpecParams.PageIndex - 1), orderSpecParams.PageSize);

        spec.AddInclude(x => x.OrderDetails);

        spec.AddInclude("OrderDetails.Medicine");

        spec.AddInclude(x => x.Patient.AppUser);

        return spec;
    }
}