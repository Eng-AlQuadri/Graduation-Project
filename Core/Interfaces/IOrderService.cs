using Core.DTOs;
using Core.Specifications;

namespace Core.Interfaces;

public interface IOrderService
{
    public Task<ApiResponse> GetOrders(OrderSpecParams orderSpecParams);
}