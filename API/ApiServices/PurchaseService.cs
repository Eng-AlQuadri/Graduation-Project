using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;

namespace API.ApiServices;

public class PurchaseService : BaseService, IPurchaseService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public PurchaseService(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _httpContextAccessor = httpContextAccessor;
    }


    public async Task<ApiResponse> CreatePurchase(CreatePurchaseDto createPurchaseDto)
    {
        var supplier = await _unitOfWork.Repository<SupplierUser>()
            .GetEntityWithSpec(SupplierSpecification.GetSupplierDetails(createPurchaseDto.SupplierId));

        if (supplier is null) return Response(false, 400, "Supplier not found", null);

        var medicine = await _unitOfWork.Repository<Medicine>().GetByIdAsync(createPurchaseDto.MedicineId);

        if (medicine is null) return Response(false, 400, "Medicine not found", null);

        if (!supplier.Medicines.Contains(medicine)) return Response(false, 400, "Supplier does not provide this medicine", null);

        var purchase = _mapper.Map<Purchase>(createPurchaseDto);

        medicine.Stock += createPurchaseDto.Quantity;

        purchase.Supplier = supplier;

        purchase.Medicine = medicine;

        purchase.TotalPrice = medicine.Price * createPurchaseDto.Quantity;

        purchase.PurchaseTime = DateTime.UtcNow;

        _unitOfWork.Repository<Purchase>().Add(purchase);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 201, null, _mapper.Map<PurchaseDto>(purchase))
            : Response(false, 500, "Internal Server Error");
    }


    public async Task<ApiResponse> GetPurchases(PurchaseSpecParams purchaseSpecParams)
    {
        var spec = PurchaseSpecification.GetAllPurchases(purchaseSpecParams);

        var data = await CreatePagedResult<Purchase, PurchaseDto>(_unitOfWork.Repository<Purchase>(), spec,
            purchaseSpecParams.PageIndex, purchaseSpecParams.PageSize, _mapper);

        return Response(true, 200, null, data);
    }


    public async Task<ApiResponse> GetPurchasesBySupplier(int supplierId, PurchaseSpecParams purchaseSpecParams)
    {
        var spec = PurchaseSpecification.GetPurchasesBySupplier(supplierId, purchaseSpecParams);

        var data = await CreatePagedResult<Purchase, PurchaseDto>(_unitOfWork.Repository<Purchase>(), spec,
            purchaseSpecParams.PageIndex, purchaseSpecParams.PageSize, _mapper);

        return Response(true, 200, null, data);
    }
}