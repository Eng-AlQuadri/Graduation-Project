using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class DeliveryController : BaseApiController
{
    private readonly IDeliveryService _deliveryService;

    public DeliveryController(IDeliveryService deliveryService)
    {
        _deliveryService = deliveryService;
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet("get-deliveries")]
    public async Task<IActionResult> GetDeliveries([FromQuery] DeliverySpecParams deliverySpecParams)
    {
        var response = await _deliveryService.GetDeliveries(deliverySpecParams);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequirePatientRole")]
    [HttpGet("get-deliveries-by-patient")]
    public async Task<IActionResult> GetDeliveriesByPatient([FromQuery] DeliverySpecParams deliverySpecParams)
    {
        var response = await _deliveryService.GetDeliveriesByPatient(deliverySpecParams);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireDeliveryRole")]
    [HttpGet("get-deliveries-by-worker")]
    public async Task<IActionResult> GetDeliveriesByWorker([FromQuery] DeliverySpecParams deliverySpecParams)
    {
        var response = await _deliveryService.GetDeliveriesByWorker(deliverySpecParams);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireDeliveryRole")]
    [HttpPut("complete-delivery/{deliveryId}")]
    public async Task<IActionResult> CompleteDelivery(int deliveryId)
    {
        var response = await _deliveryService.ModifyDeliveryStatus(deliveryId);

        return StatusCode(response.StatusCode, response);
    }
}