using Core.DTOs;
using Core.Specifications;

namespace Core.Interfaces;

public interface IPatientService
{
    public Task<ApiResponse> GetPatients(PatientSpecParams patientSpecParams);
    public Task<ApiResponse> GetPatientsByDoctor();
    public Task<ApiResponse> GetPatientById(int id);
    public Task<ApiResponse> GetMyProfile();
    public Task<ApiResponse> CreatePatient(CreatePatientDto createPatientDto);
    public Task<ApiResponse> UpdatePatient(UpdatePatientDto updatePatientDto);
    public Task<ApiResponse> UpdateMyProfile(UpdatePatientDto updatePatientDto);
    public Task<ApiResponse> DeletePatient(int id);
}