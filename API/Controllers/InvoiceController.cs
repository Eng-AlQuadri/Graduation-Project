using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Core.DTOs;
using Core.Specifications;

namespace API.Controllers;

[Authorize]
public class InvoiceController : BaseApiController
{
    private readonly IInvoiceService _invoiceService;

    public InvoiceController(IInvoiceService invoiceService)
    {
        _invoiceService = invoiceService;
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet]
    public async Task<IActionResult> GetInvoices([FromQuery] InvoiceSpecParams invoiceParams)
    {
        var response = await _invoiceService.GetInvoices(invoiceParams);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequirePatientRole")]
    [HttpGet("patient/{patientId}")]
    public async Task<IActionResult> GetInvoicesByPatient
        (int patientId, [FromQuery] InvoiceSpecParams invoiceParams)
    {
        var response = await _invoiceService.GetInvoicesByPatient(patientId, invoiceParams);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpPost]
    public async Task<ActionResult> CreateInvoice(CreateInvoiceDto createInvoiceDto)
    {
        var response = await _invoiceService.CreateInvoice(createInvoiceDto);

        return StatusCode(response.StatusCode, response);
    }
}
