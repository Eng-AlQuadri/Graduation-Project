using Core.DTOs;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize]
public class MedicineController : BaseApiController
{
    private readonly IMedicineService _medicineService;

    public MedicineController(IMedicineService medicineService)
    {
        _medicineService = medicineService;
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet]
    public async Task<IActionResult> GetMedicines([FromQuery] MedicineSpecParams medicineParams)
    {
        var response = await _medicineService.GetMedicines(medicineParams);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpGet("get-medicine/{id}")]
    public async Task<IActionResult> GetMedicine(int id)
    {
        var response = await _medicineService.GetMedicineById(id);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireSupplierRole")]
    [HttpGet("supplier/{supplierId}")]
    public async Task<IActionResult> GetMedicinesBySupplier
        (int supplierId, [FromQuery] MedicineSpecParams medicineParams)
    {
        var response = await _medicineService.GetMedicinesBySupplier(supplierId, medicineParams);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequirePatientRole")]
    [HttpGet("patient/{patientId}")]
    public async Task<IActionResult> GetMedicinesByPatient
        (int patientId, [FromQuery] MedicineSpecParams medicineParams)
    {
        var response = await _medicineService.GetMedicinesByPateint(patientId, medicineParams);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequirePatientRole")]
    [HttpGet("all-medicines")]
    public async Task<IActionResult> GetAllMedicines()
    {
        var response = await _medicineService.GetAllMedicines();

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpPost]
    public async Task<IActionResult> CreateMedicine(CreateMedicineDto createMedicineDto)
    {
        var response = await _medicineService.CreateMedicine(createMedicineDto);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpPost("assign/{medicineId}/supplier/{supplierId}")]
    public async Task<IActionResult> AssignMedicineToSupplier(int medicineId, int supplierId)
    {
        var response = await _medicineService.AssignMedicineToSupplier(medicineId, supplierId);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpPost("remove/{medicineId}/supplier/{supplierId}")]
    public async Task<IActionResult> RemoveMedicineFromSupplier(int medicineId, int supplierId)
    {
        var response = await _medicineService.RemoveMedicineFromSupplier(medicineId, supplierId);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequireAdminRole")]
    [HttpPut]
    public async Task<IActionResult> UpdateMedicine(UpdateMedicineDto updateMedicineDto)
    {
        var response = await _medicineService.UpdateMedicine(updateMedicineDto);

        return StatusCode(response.StatusCode, response);
    }
    

    [Authorize(Policy = "RequireAdminRole")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteMedicine(int id)
    {
        var response = await _medicineService.DeleteMedicine(id);

        return StatusCode(response.StatusCode, response);
    }    
}