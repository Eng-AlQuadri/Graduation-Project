using API.Extensions;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Identity;

namespace API.ApiServices;

public class DeliveryService : BaseService, IDeliveryService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<AppUser> _userManager;

    public DeliveryService(IMapper mapper, IUnitOfWork unitOfWork,
        IHttpContextAccessor httpContextAccessor, UserManager<AppUser> userManager)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
    }


    public async Task<ApiResponse> GetDeliveries(DeliverySpecParams deliverySpecParams)
    {
        var spec = DeliverySpecification.GetAllDeliveries(deliverySpecParams);

        var data = await CreatePagedResult<Delivery, DeliveryDto>(_unitOfWork.Repository<Delivery>(), spec,
            deliverySpecParams.PageIndex, deliverySpecParams.PageSize, _mapper);

        return Response(true, 200, null, data);
    }

    public async Task<ApiResponse> GetDeliveriesByPatient(DeliverySpecParams deliverySpecParams)
    {
        var patientId = _httpContextAccessor.HttpContext!.User.GetUserId();

        var spec = DeliverySpecification.GetAllDeliveriesByPatient(deliverySpecParams, patientId);

        var data = await CreatePagedResult<Delivery, DeliveryDto>(_unitOfWork.Repository<Delivery>(), spec,
            deliverySpecParams.PageIndex, deliverySpecParams.PageSize, _mapper);

        return Response(true, 200, null, data);
    }

    public async Task<ApiResponse> GetDeliveriesByWorker(DeliverySpecParams deliverySpecParams)
    {
        var workerId = _httpContextAccessor.HttpContext!.User.GetUserId();

        var spec = DeliverySpecification.GetAllDeliveriesByWorker(deliverySpecParams, workerId);

        var data = await CreatePagedResult<Delivery, DeliveryDto>(_unitOfWork.Repository<Delivery>(), spec,
            deliverySpecParams.PageIndex, deliverySpecParams.PageSize, _mapper);

        return Response(true, 200, null, data);
    }

    public async Task<ApiResponse> ModifyDeliveryStatus(int deliveryId)
    {
        var delivery = await _unitOfWork.Repository<Delivery>().GetEntityWithSpec(
            DeliverySpecification.GetDeliveryDataByDeliveryId(deliveryId));

        if (delivery is null) return Response(false, 400, "Delivery not found", null);

        delivery.CompletedAt = DateTime.UtcNow;

        delivery.Status = 1;

        _unitOfWork.Repository<Delivery>().Update(delivery);

        var saved = await _unitOfWork.Complete();

        return saved 
            ? Response(true, 200, null, null)
            : Response(false, 500, "Internal Server Error", null);
    }
}