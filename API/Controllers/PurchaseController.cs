using Core.DTOs;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class PurchaseController : BaseApiController
{
    private readonly IPurchaseService _purchaseService;

    public PurchaseController(IPurchaseService purchaseService)
    {
        _purchaseService = purchaseService;
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet]
    public async Task<IActionResult> GetPurchases([FromQuery] PurchaseSpecParams purchaseSpecParams)
    {
        var response = await _purchaseService.GetPurchases(purchaseSpecParams);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet("supplier/{supplierId}")]
    public async Task<IActionResult> GetPurchasesBySupplier
        (int supplierId, [FromQuery] PurchaseSpecParams purchaseSpecParams)
    {
        var response = await _purchaseService.GetPurchasesBySupplier(supplierId, purchaseSpecParams);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpPost]
    public async Task<IActionResult> CreatePurchase(CreatePurchaseDto createPurchaseDto)
    {
        var response = await _purchaseService.CreatePurchase(createPurchaseDto);

        return StatusCode(response.StatusCode, response);
    }
}