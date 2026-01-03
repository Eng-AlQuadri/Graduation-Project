using System.Text.Json;
using Core.DTOs;
using Core.Entities;
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


    [Authorize("RequireAdminRole")]
    [HttpPut("approve-order/{orderId:int}")]
    public async Task<IActionResult> ApproveOrder(int orderId)
    {
        var response = await _orderService.ApproveOrder(orderId);

        return StatusCode(response.StatusCode, response);
    }

    [Authorize("RequirePatientRole")]
    [HttpPost("create-order")]
    public async Task<IActionResult> CreateOrder([FromForm] CreateOrderDto createOrderDto)
    {
        var response = await _orderService.CreateOrder(createOrderDto);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize("RequireDoctorRole")]
    [HttpPost("create-order-by-doctor")]
    public async Task<IActionResult> CreateOrderByDoctor([FromForm] CreateOrderDtoByDoctor createOrderDto)
    {
        var response = await _orderService.CreateOrderByDoctor(createOrderDto);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize("RequirePatientRole")]
    [HttpGet("get-my-orders")]
    public async Task<IActionResult> GetPatientOrders([FromQuery] OrderSpecParams orderSpecParams)
    {
        var response = await _orderService.GetOrdersByPatient(orderSpecParams);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize("RequireDoctorRole")]
    [HttpGet("get-doctor-orders")]
    public async Task<IActionResult> GetDoctorOrders([FromQuery] OrderSpecParams orderSpecParams)
    {
        var response = await _orderService.GetOrdersByDoctor(orderSpecParams);

        return StatusCode(response.StatusCode, response);
    }
}