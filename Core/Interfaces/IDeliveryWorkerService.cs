using Core.DTOs;
using Core.Specifications;

namespace Core.Interfaces;

public interface IDeliveryWorkerService
{
    public Task<ApiResponse> GetDeliveryWorkers(DeliveryWorkerSpecParams deliveryWorkerSpecParams);
    public Task<ApiResponse> GetDeliveryWorkerById(int id);
    public Task<ApiResponse> GetMyProfile();
    public Task<ApiResponse> CreateDeliveryWorker(CreateDeliveryWorkerDto createDeliveryWorkerDto);
    public Task<ApiResponse> UpdateDeliveryWorker(UpdateDeliveryWorkerDto updateDeliveryWorkerDto);
    public Task<ApiResponse> UpdateMyProfile(UpdateDeliveryWorkerDto updateDeliveryWorkerDto);
    public Task<ApiResponse> DeleteDeliveryWorker(int id);
}