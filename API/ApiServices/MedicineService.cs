using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;

namespace API.ApiServices;

public class MedicineService : BaseService, IMedicineService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public MedicineService(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<ApiResponse> AssignMedicineToSupplier(int medicineId, int supplierId)
    {
        var supplier = await _unitOfWork.Repository<SupplierUser>().GetByIdAsync(supplierId);

        if (supplier is null) return Response(false, 400, "Supplier not found", null);

        var medicine = await _unitOfWork.Repository<Medicine>().GetByIdAsync(medicineId);

        if (medicine is null) return Response(false, 400, "Medicine not found");

        supplier.Medicines.Add(medicine);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 200, null, null)
            : Response(false, 500, "Internal server error");
    }

    public async Task<ApiResponse> CreateMedicine(CreateMedicineDto createMedicineDto)
    {
        if (await MedicineExists(createMedicineDto.Name))
            return Response(false, 400, "Medicine exists");

        var medicine = _mapper.Map<Medicine>(createMedicineDto);

        _unitOfWork.Repository<Medicine>().Add(medicine);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 200, null, medicine)
            : Response(false, 500, "Internal server error");
    }

    public async Task<ApiResponse> DeleteMedicine(int id)
    {
        var medicine = await _unitOfWork.Repository<Medicine>().GetByIdAsync(id);

        if (medicine is null) return Response(false, 200, "Medicine not found");

        _unitOfWork.Repository<Medicine>().Remove(medicine);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 200, null, null)
            : Response(false, 500, "Internal server error", null);
    }

    public async Task<ApiResponse> GetMedicineById(int medicineId)
    {
        var medicine = await _unitOfWork.Repository<Medicine>().GetByIdAsync(medicineId);

        if (medicine is null) return Response(false, 200, "Medicine not found");

        return Response(true, 200, null, medicine);
    }

    public async Task<ApiResponse> GetMedicineByName(string medicineName)
    {
        var medicine = await _unitOfWork.Repository<Medicine>()
            .GetEntityWithSpec(MedicineSpecification.GetMedicineByName(medicineName));

        if (medicine is null) return Response(false, 400, "Medicine not found");

        return Response(true, 200, null, medicine);
    }

    public async Task<ApiResponse> GetMedicines(MedicineSpecParams medicineSpecParams)
    {
        var spec = MedicineSpecification.GetAllMedicines(medicineSpecParams);

        var data = await CreatePagedResult<Medicine, MedicineDto>(_unitOfWork.Repository<Medicine>(), spec,
            medicineSpecParams.PageIndex, medicineSpecParams.PageSize, _mapper);

        return Response(true, 200, null, data);
    }

    public async Task<ApiResponse> GetMedicinesByPateint(int patientId, MedicineSpecParams medicineSpecParams)
    {
        var spec = MedicineSpecification.GetAllMedicinesByPatient(patientId, medicineSpecParams);

        var data = await CreatePagedResult<Medicine, MedicineDto>(_unitOfWork.Repository<Medicine>(), spec,
            medicineSpecParams.PageIndex, medicineSpecParams.PageSize, _mapper);

        return Response(true, 200, null, data);
    }

    public async Task<ApiResponse> GetMedicinesBySupplier(int supplierId, MedicineSpecParams medicineSpecParams)
    {
        var medicineSpec = MedicineSpecification.GetAllMedicinesBySupplier(supplierId, medicineSpecParams);

        var data = await CreatePagedResult<Medicine, MedicineDto>(_unitOfWork.Repository<Medicine>(), medicineSpec,
            medicineSpecParams.PageIndex, medicineSpecParams.PageSize, _mapper);

        return Response(true, 200, null, data);
    }

    public async Task<ApiResponse> RemoveMedicineFromSupplier(int medicineId, int supplierId)
    {
        var supplier = await _unitOfWork.Repository<SupplierUser>()
            .GetEntityWithSpec(SupplierSpecification.GetSupplierDetails(supplierId));

        if (supplier is null) return Response(false, 400, "Supplier not found", null);

        var medicine = supplier.Medicines.FirstOrDefault(x => x.Id == medicineId);

        if (medicine is null) return Response(false, 400, "Supplier doesn't supply this medicine");

        supplier.Medicines.Remove(medicine);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 200, null, null)
            : Response(false, 500, "Internal server error");
    }

    public async Task<ApiResponse> UpdateMedicine(UpdateMedicineDto updateMedicineDto)
    {
        var medicine = await _unitOfWork.Repository<Medicine>().GetByIdAsync(updateMedicineDto.UpdateMedicineId);

        if (medicine is null) return Response(false, 400, "Medicine not found");

        _mapper.Map(updateMedicineDto, medicine);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 200, null, null)
            : Response(false, 500, "Internal server error");
    }

    private async Task<bool> MedicineExists(string name)
    {
        var medicine = await _unitOfWork.Repository<Medicine>()
            .GetEntityWithSpec(MedicineSpecification.GetMedicineByName(name));
        
        if (medicine is null) return false;
        
        return true;
    }
}