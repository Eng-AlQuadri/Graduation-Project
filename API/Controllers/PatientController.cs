using Core.DTOs;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class PatientController : BaseApiController
{
    private readonly IPatientService _patientService;

    public PatientController(IPatientService patientService)
    {
        _patientService = patientService;
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet]
    public async Task<IActionResult> GetPatients([FromQuery] PatientSpecParams patientSpecParams)
    {
        var response = await _patientService.GetPatients(patientSpecParams);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireDoctorRole")]
    [HttpGet("get-patients-by-doctor")]
    public async Task<IActionResult> GetPatientsByDoctor()
    {
        var response = await _patientService.GetPatientsByDoctor();

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet("get-patient/{id}")]
    public async Task<IActionResult> GetPatient(int id)
    {
        var response = await _patientService.GetPatientById(id);

        return StatusCode(response.StatusCode, response);
    }


    [HttpGet("my-profile")]
    public async Task<IActionResult> GetMyProfile()
    {
        var response = await _patientService.GetMyProfile();

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpPost]
    public async Task<IActionResult> CreatePatient(CreatePatientDto createPatientDto)
    {
        var response = await _patientService.CreatePatient(createPatientDto);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpPut]
    public async Task<ActionResult> UpdatePatient(UpdatePatientDto updatePatientDto)
    {
        var response = await _patientService.UpdatePatient(updatePatientDto);

        return StatusCode(response.StatusCode, response);
    }


    [HttpPut("update-my-profile")]
    public async Task<ActionResult> UpdateMyProfile(UpdatePatientDto updatePatientDto)
    {
        var response = await _patientService.UpdateMyProfile(updatePatientDto);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePatient(int id)
    {
        var response = await _patientService.DeletePatient(id);

        return StatusCode(response.StatusCode, response);
    }
}