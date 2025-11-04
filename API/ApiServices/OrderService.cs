using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;

namespace API.ApiServices;

public class OrderService : BaseService, IOrderService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public OrderService(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<ApiResponse> GetOrders(OrderSpecParams orderSpecParams)
    {
        var spec = OrderSpecification.GetAllOrders(orderSpecParams);

        var data = await CreatePagedResult<Order, OrderDto>(_unitOfWork.Repository<Order>(), spec,
            orderSpecParams.PageIndex, orderSpecParams.PageSize, _mapper);

        return Response(true, 200, null, data);
    }
}