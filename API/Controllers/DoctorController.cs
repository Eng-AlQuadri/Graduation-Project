using Core.DTOs;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class DoctorController : BaseApiController
{
    private readonly IDoctorService _doctorService;

    public DoctorController(IDoctorService doctorService)
    {
        _doctorService = doctorService;
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet]
    public async Task<IActionResult> GetDoctors([FromQuery] DoctorSpecParams doctorSpecParams)
    {
        var response = await _doctorService.GetDoctors(doctorSpecParams);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet("get-doctor/{id}")]
    public async Task<IActionResult> GetDoctor(int id)
    {
        var response = await _doctorService.GetDoctorById(id);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpPost]
    public async Task<IActionResult> CreateDoctor(CreateDoctorDto createDoctorDto)
    {
        var response = await _doctorService.CreateDoctor(createDoctorDto);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpPut]
    public async Task<ActionResult> UpdateDoctor(UpdateDoctorDto updateDoctorDto)
    {
        var response = await _doctorService.UpdateDoctor(updateDoctorDto);

        return StatusCode(response.StatusCode, response);
    }


    [HttpPut("update-my-profile")]
    public async Task<ActionResult> UpdateMyProfile(UpdateDoctorDto updateDoctorDto)
    {
        var response = await _doctorService.UpdateMyProfile(updateDoctorDto);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeletePatient(int id)
    {
        var response = await _doctorService.DeleteDoctor(id);

        return StatusCode(response.StatusCode, response);
    }
}