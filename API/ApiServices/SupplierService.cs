using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.ApiServices;

public class SupplierService : BaseService, ISupplierService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<AppUser> _userManager;

    public SupplierService(IMapper mapper, IUnitOfWork unitOfWork,
        IHttpContextAccessor httpContextAccessor, UserManager<AppUser> userManager)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
    }


    public async Task<ApiResponse> CreateSupplier(CreateSupplierDto createSupplierDto)
    {
        if (await UserExists(createSupplierDto.Email))
        {
            return Response(false, 400, "Please use another email", null);
        }

        var appUser = _mapper.Map<AppUser>(createSupplierDto);

        var result = await _userManager.CreateAsync(appUser, "Pa$$w0rd");

        if (!result.Succeeded) 
        {
            return Response(false, 400, string.Join(", ", result.Errors.Select(x => x.Description)), null);
        }

        var roleResult = await _userManager.AddToRoleAsync(appUser, "Supplier");

        if (!roleResult.Succeeded)
        {
            return Response(false, 400, string.Join(", ", roleResult.Errors.Select(x => x.Description)), null);
        }

        var supplier = new SupplierUser
        {
            AppUserId = appUser.Id
        };

        _unitOfWork.Repository<SupplierUser>().Add(supplier);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 201, null, _mapper.Map<SupplierDto>(supplier))
            : Response(false, 500, "Internal Server Error", null);
    }


    public async Task<ApiResponse> DeleteSupplier(int supplierId)
    {
        var supplier = await _unitOfWork.Repository<SupplierUser>()
            .GetEntityWithSpec(SupplierSpecification.GetSupplierUserData(supplierId));

        if (supplier is null) return Response(false, 400, "Supplier not found");

        var result = await _userManager.DeleteAsync(supplier.AppUser);

        if (!result.Succeeded) return Response(false, 500, string.Join(", ", result.Errors.Select(x => x.Description)), null);

        _unitOfWork.Repository<SupplierUser>().Remove(supplier);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 200)
            : Response(false, 500, "Internal Server Error");
    }


    public async Task<ApiResponse> GetSupplierById(int supplierId)
    {
        var supplier = await _unitOfWork.Repository<SupplierUser>()
            .GetEntityWithSpec(SupplierSpecification.GetSupplierUserData(supplierId));

        if (supplier is null) return Response(false, 400, "Supplier not found");

        return Response(true, 200, null, _mapper.Map<SupplierDto>(supplier));
    }


    public async Task<ApiResponse> GetSuppliers(SupplierSpecParams supplierSpecParams)
    {
        var spec = SupplierSpecification.GetAllSuppliers(supplierSpecParams);

        var data = await CreatePagedResult<SupplierUser, SupplierDto>(_unitOfWork.Repository<SupplierUser>(), spec,
            supplierSpecParams.PageIndex, supplierSpecParams.PageSize, _mapper);

        return Response(true, 200, null, data);
    }


    public async Task<ApiResponse> UpdateSupplier(UpdateSupplierDto updateSupplierDto)
    {
        var supplier = await _unitOfWork.Repository<SupplierUser>()
            .GetEntityWithSpec(SupplierSpecification.GetSupplierUserData(updateSupplierDto.UpdateSupplierId));

        if (supplier is null) return Response(false, 400, "Supplier not found");

        _mapper.Map(updateSupplierDto, supplier.AppUser);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 200)
            : Response(false, 500, "Internal Server Error");   
            
    }


    private async Task<bool> UserExists(string email)
    {
        return await _userManager.Users.AnyAsync(x => x.Email == email);
    }
}