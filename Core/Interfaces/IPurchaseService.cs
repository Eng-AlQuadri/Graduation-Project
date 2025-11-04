using Core.DTOs;
using Core.Specifications;

namespace Core.Interfaces;

public interface IPurchaseService
{
    public Task<ApiResponse> GetPurchases(PurchaseSpecParams purchaseSpecParams);
    public Task<ApiResponse> GetPurchasesBySupplier(int supplierId, PurchaseSpecParams purchaseSpecParams);
    public Task<ApiResponse> CreatePurchase(CreatePurchaseDto createPurchaseDto);
}