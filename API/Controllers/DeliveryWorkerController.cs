using Core.DTOs;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class DeliveryWorkerController : BaseApiController
{
    private readonly IDeliveryWorkerService _deliveryWorkerService;

    public DeliveryWorkerController(IDeliveryWorkerService deliveryWorkerService)
    {
        _deliveryWorkerService = deliveryWorkerService;
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet]
    public async Task<IActionResult> GetDeliveryWorkers([FromQuery] DeliveryWorkerSpecParams deliveryWorkerSpecParams)
    {
        var response = await _deliveryWorkerService.GetDeliveryWorkers(deliveryWorkerSpecParams);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetDeliveryWorker(int id)
    {
        var response = await _deliveryWorkerService.GetDeliveryWorkerById(id);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpPost]
    public async Task<IActionResult> CreateDeliveryWorker(CreateDeliveryWorkerDto createDeliveryWorkerDto)
    {
        var response = await _deliveryWorkerService.CreateDeliveryWorker(createDeliveryWorkerDto);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpPut]
    public async Task<ActionResult> UpdateDeliveryWorker(UpdateDeliveryWorkerDto updateDeliveryWorkerDto)
    {
        var response = await _deliveryWorkerService.UpdateDeliveryWorker(updateDeliveryWorkerDto);

        return StatusCode(response.StatusCode, response);
    }


    [HttpPut("update-my-profile")]
    public async Task<ActionResult> UpdateMyProfile(UpdateDeliveryWorkerDto updateDeliveryWorkerDto)
    {
        var response = await _deliveryWorkerService.UpdateMyProfile(updateDeliveryWorkerDto);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteDeliveryWorker(int id)
    {
        var response = await _deliveryWorkerService.DeleteDeliveryWorker(id);

        return StatusCode(response.StatusCode, response);
    }
}