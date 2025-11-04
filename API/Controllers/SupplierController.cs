using Core.DTOs;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class SupplierController : BaseApiController
{
    private readonly ISupplierService _supplierService;

    public SupplierController(ISupplierService supplierService)
    {
        _supplierService = supplierService;
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet]
    public async Task<IActionResult> GetSuppliers([FromQuery] SupplierSpecParams supplierSpecParams)
    {
        var response = await _supplierService.GetSuppliers(supplierSpecParams);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetSupplier(int id)
    {
        var response = await _supplierService.GetSupplierById(id);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpPost]
    public async Task<IActionResult> CreateSupplier(CreateSupplierDto createSupplierDto)
    {
        var response = await _supplierService.CreateSupplier(createSupplierDto);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpPut]
    public async Task<IActionResult> UpdateSupplier(UpdateSupplierDto updateSupplierDto)
    {
        var response = await _supplierService.UpdateSupplier(updateSupplierDto);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteSupplier(int id)
    {
        var response = await _supplierService.DeleteSupplier(id);

        return StatusCode(response.StatusCode, response);
    }
}