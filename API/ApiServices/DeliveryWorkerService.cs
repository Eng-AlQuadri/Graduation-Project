using API.Extensions;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.ApiServices;

public class DeliveryWorkerService : BaseService, IDeliveryWorkerService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<AppUser> _userManager;

    public DeliveryWorkerService(IMapper mapper, IUnitOfWork unitOfWork,
        IHttpContextAccessor httpContextAccessor, UserManager<AppUser> userManager)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<ApiResponse> CreateDeliveryWorker(CreateDeliveryWorkerDto createDeliveryWorkerDto)
    {
        if (await UserExists(createDeliveryWorkerDto.Email))
        {
            return Response(false, 400, "Please choose another email", null);
        }

        var user = _mapper.Map<AppUser>(createDeliveryWorkerDto);

        var result = await _userManager.CreateAsync(user, "Pa$$w0rd");

        if (!result.Succeeded)
        {
            return Response(false, 400, string.Join(", ", result.Errors.Select(e => e.Description)), null);
        }

        var roleResult = await _userManager.AddToRoleAsync(user, "Delivery");

        if (!roleResult.Succeeded)
        {
            return Response(false, 400, string.Join(", ", result.Errors.Select(e => e.Description)), null);
        }

        var deliveryWorker = new DeliveryUser
        {
            AppUserId = user.Id,
            Id = user.Id,
            AppUser = user
        };

        _unitOfWork.Repository<DeliveryUser>().Add(deliveryWorker);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 201, null, _mapper.Map<DeliveryWorkerDto>(deliveryWorker))
            : Response(false, 500, "Internal Server Error", null);    
    }


    public async Task<ApiResponse> DeleteDeliveryWorker(int id)
    {
        var deliveryWorker = await _unitOfWork.Repository<DeliveryUser>()
            .GetEntityWithSpec(DeliveryWorkerSpecification.GetFullDeliveryWorkerData(id));

        if (deliveryWorker is null) return Response(false, 400, "User not found", null);

        var result = await _userManager.DeleteAsync(deliveryWorker.AppUser);

        if (!result.Succeeded) return Response(false, 400, "Cannot delete delivery worker, may be he have related records");

        return Response(true, 200, null, null);    }


    public async Task<ApiResponse> GetDeliveryWorkerById(int id)
    {
        var deliveryWorker = await _unitOfWork.Repository<DeliveryUser>()
            .GetEntityWithSpec(DeliveryWorkerSpecification.GetFullDeliveryWorkerData(id));

        if (deliveryWorker is null) return Response(false, 400, "Delivery worker not found");

        return Response(true, 200, null, _mapper.Map<DeliveryWorkerDto>(deliveryWorker));  
    }


    public async Task<ApiResponse> GetDeliveryWorkers(DeliveryWorkerSpecParams deliveryWorkerSpecParams)
    {
        var spec = DeliveryWorkerSpecification.GetAllDeliveryWorkers(deliveryWorkerSpecParams);

        var data = await CreatePagedResult<DeliveryUser, DeliveryWorkerDto>(_unitOfWork.Repository<DeliveryUser>(), spec,
            deliveryWorkerSpecParams.PageIndex, deliveryWorkerSpecParams.PageSize, _mapper);

        return Response(true, 200, null, data);       
    }


    public Task<ApiResponse> GetMyProfile()
    {
        throw new NotImplementedException();
    }


    public async Task<ApiResponse> UpdateDeliveryWorker(UpdateDeliveryWorkerDto updateDeliveryWorkerDto)
    {
        var deliveryWorker = await _unitOfWork.Repository<DeliveryUser>()
            .GetEntityWithSpec(DeliveryWorkerSpecification.GetFullDeliveryWorkerData(updateDeliveryWorkerDto.UpdateDoctorId));

        if (deliveryWorker is null) return Response(false, 400, "Delivery worker not found", null);

        _mapper.Map(updateDeliveryWorkerDto, deliveryWorker.AppUser);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 200, null, null)
            : Response(false, 500, "Internal Server Error", null);       }


    public async Task<ApiResponse> UpdateMyProfile(UpdateDeliveryWorkerDto updateDeliveryWorkerDto)
    {
        var deliveryWorker = await _unitOfWork.Repository<DeliveryUser>()
            .GetEntityWithSpec(DeliveryWorkerSpecification
                .GetFullDeliveryWorkerData(_httpContextAccessor.HttpContext!.User.GetUserId()));

        if (deliveryWorker is null) return Response(false, 400, "Delivery worker not found", null);

        _mapper.Map(updateDeliveryWorkerDto, deliveryWorker.AppUser);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 200, null, null)
            : Response(false, 500, "Internal Server Error", null);    }


    private async Task<bool> UserExists(string email)
    {
        return await _userManager.Users.AnyAsync(x => x.Email == email);
    }
}