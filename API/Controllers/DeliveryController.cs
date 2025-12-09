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
}