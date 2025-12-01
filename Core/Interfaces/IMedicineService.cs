using Core.DTOs;
using Core.Specifications;

namespace Core.Interfaces;

public interface IMedicineService
{
    public Task<ApiResponse> GetMedicines(MedicineSpecParams medicineSpecParams);
    public Task<ApiResponse> GetAllMedicines();
    public Task<ApiResponse> GetMedicineById(int medicineId);
    public Task<ApiResponse> GetMedicineByName(string medicineName);
    public Task<ApiResponse> GetMedicinesBySupplier(int supplierId, MedicineSpecParams medicineSpecParams);
    public Task<ApiResponse> GetMedicinesByPateint(int patientId, MedicineSpecParams medicineSpecParams);
    public Task<ApiResponse> CreateMedicine(CreateMedicineDto createMedicineDto);
    public Task<ApiResponse> AssignMedicineToSupplier(int medicineId, int supplierId);
    public Task<ApiResponse> RemoveMedicineFromSupplier(int medicineId, int supplierId);
    public Task<ApiResponse> UpdateMedicine(UpdateMedicineDto updateMedicineDto);
    public Task<ApiResponse> DeleteMedicine(int id);
}