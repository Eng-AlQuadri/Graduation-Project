using Core.DTOs;
using Core.Specifications;

namespace Core.Interfaces;

public interface IDoctorService
{
    public Task<ApiResponse> GetDoctors(DoctorSpecParams doctorSpecParams);
    public Task<ApiResponse> GetDoctorById(int id);
    public Task<ApiResponse> GetMyProfile();
    public Task<ApiResponse> CreateDoctor(CreateDoctorDto createDoctorDto);
    public Task<ApiResponse> UpdateDoctor(UpdateDoctorDto updateDoctorDto);
    public Task<ApiResponse> UpdateMyProfile(UpdateDoctorDto updateDoctorDto);
    public Task<ApiResponse> DeleteDoctor(int id);
}