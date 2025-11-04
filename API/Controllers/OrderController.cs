using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class OrderController : BaseApiController
{
    private readonly IOrderService _orderService;

    public OrderController(IOrderService orderService)
    {
        _orderService = orderService;
    }


    [Authorize("RequireAdminRole")]
    [HttpGet]
    public async Task<IActionResult> GetOrders([FromQuery] OrderSpecParams orderSpecParams)
    {
        var response = await _orderService.GetOrders(orderSpecParams);

        return StatusCode(response.StatusCode, response);
    }
}