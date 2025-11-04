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

        return spec;
    }
}