using Core.DTOs;
using Core.Specifications;

namespace Core.Interfaces;

public interface ISupplierService
{
    public Task<ApiResponse> GetSuppliers(SupplierSpecParams supplierSpecParams);
    public Task<ApiResponse> GetSupplierById(int id);
    public Task<ApiResponse> CreateSupplier(CreateSupplierDto createSupplierDto);
    public Task<ApiResponse> UpdateSupplier(UpdateSupplierDto updateSupplierDto);
    public Task<ApiResponse> DeleteSupplier(int id);
}