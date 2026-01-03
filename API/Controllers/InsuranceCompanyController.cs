using Core.DTOs;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class InsuranceCompanyController : BaseApiController
{
    private readonly IInsuranceCompanyService _insuranceCompanyService;

    public InsuranceCompanyController(IInsuranceCompanyService insuranceCompanyService)
    {
        _insuranceCompanyService = insuranceCompanyService;
    }


    [Authorize(Roles = "Admin,Patient")]
    [HttpGet]
    public async Task<IActionResult> GetCompanies([FromQuery] CompanySpecParams companySpecParams)
    {
        var response = await _insuranceCompanyService.GetCompanies(companySpecParams);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpPost]
    public async Task<IActionResult> CreateCompany(CreateCompanyDto createCompanyDto)
    {
        var response = await _insuranceCompanyService.CreateCompany(createCompanyDto);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpPut]
    public async Task<ActionResult> UpdateCompany(UpdateCompanyDto updateCompanyDto)
    {
        var response = await _insuranceCompanyService.UpdateCompany(updateCompanyDto);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteCompany(int id)
    {
        var response = await _insuranceCompanyService.DeleteCompany(id);

        return StatusCode(response.StatusCode, response);
    }
}