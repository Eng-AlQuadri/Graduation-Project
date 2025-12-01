using Core.DTOs;
using Core.Specifications;
using Microsoft.AspNetCore.Http;

namespace Core.Interfaces;

public interface IOrderService
{
    public Task<ApiResponse> GetOrders(OrderSpecParams orderSpecParams);
    public Task<ApiResponse> GetOrdersByPatient(OrderSpecParams orderSpecParams);
    public Task<ApiResponse> CreateOrder(CreateOrderDto data);
    public Task<ApiResponse> ApproveOrder(int orderId);
}