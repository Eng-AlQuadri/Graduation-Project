using Core.DTOs;
using Core.Specifications;

namespace Core.Interfaces;

public interface IDeliveryService
{
    public Task<ApiResponse> GetDeliveries(DeliverySpecParams deliverySpecParams);
    public Task<ApiResponse> GetDeliveriesByPatient(DeliverySpecParams deliverySpecParams);
    public Task<ApiResponse> ModifyDeliveryStatus();
}