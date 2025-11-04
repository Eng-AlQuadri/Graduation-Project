using API.Extensions;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.ApiServices;

public class PatientService : BaseService, IPatientService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<AppUser> _userManager;

    public PatientService(IMapper mapper, IUnitOfWork unitOfWork,
        IHttpContextAccessor httpContextAccessor, UserManager<AppUser> userManager)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
    }


    public async Task<ApiResponse> CreatePatient(CreatePatientDto createPatientDto)
    {
        if (await UserExists(createPatientDto.Email))
        {
            return Response(false, 400, "Please choose another email", null);
        }

        var user = _mapper.Map<AppUser>(createPatientDto);

        var result = await _userManager.CreateAsync(user, "Pa$$w0rd");

        if (!result.Succeeded)
        {
            return Response(false, 400, string.Join(", ", result.Errors.Select(e => e.Description)), null);
        }

        var roleResult = await _userManager.AddToRoleAsync(user, "Patient");

        if (!roleResult.Succeeded)
        {
            return Response(false, 400, string.Join(", ", result.Errors.Select(e => e.Description)), null);
        }

        var patient = new PatientUser
        {
            AppUserId = user.Id
        };

        _unitOfWork.Repository<PatientUser>().Add(patient);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 201, null, user)
            : Response(false, 500, "Internal Server Error", null);
    }


    public async Task<ApiResponse> DeletePatient(int id)
    {
        var patient = await _unitOfWork.Repository<PatientUser>()
            .GetEntityWithSpec(PatientSpecification.GetFullPatientData(id));

        if (patient is null) return Response(false, 400, "User not found", null);

        var result = await _userManager.DeleteAsync(patient.AppUser);

        if (!result.Succeeded) return Response(false, 400, "Cannot delete patient, may be he have related records");

        _unitOfWork.Repository<PatientUser>().Remove(patient);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 200, null, null)
            : Response(false, 500, "Internal Server Error");
    }


    public async Task<ApiResponse> GetMyProfile()
    {
        var patient = await _unitOfWork.Repository<PatientUser>()
            .GetEntityWithSpec(PatientSpecification
                .GetFullPatientData(_httpContextAccessor.HttpContext!.User.GetUserId()));

        if (patient is null) return Response(false, 400, "Patient not found");

        return Response(true, 200, null, _mapper.Map<PatientDto>(patient));
    }


    public async Task<ApiResponse> GetPatientById(int id)
    {
        var patient = await _unitOfWork.Repository<PatientUser>()
            .GetEntityWithSpec(PatientSpecification.GetFullPatientData(id));

        if (patient is null) return Response(false, 400, "Patient not found");

        return Response(true, 200, null, _mapper.Map<PatientDto>(patient));
    }


    public async Task<ApiResponse> GetPatients(PatientSpecParams patientSpecParams)
    {
        var spec = PatientSpecification.GetAllPatients(patientSpecParams);

        var data = await CreatePagedResult<PatientUser, PatientDto>(_unitOfWork.Repository<PatientUser>(), spec,
            patientSpecParams.PageIndex, patientSpecParams.PageSize, _mapper);

        return Response(true, 200, null, data);
    }


    public async Task<ApiResponse> UpdateMyProfile(UpdatePatientDto updatePatientDto)
    {
        var patient = await _unitOfWork.Repository<PatientUser>()
            .GetEntityWithSpec(PatientSpecification
                .GetFullPatientData(_httpContextAccessor.HttpContext!.User.GetUserId()));

        if (patient is null) return Response(false, 400, "Patient not found", null);

        _mapper.Map(updatePatientDto, patient.AppUser);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 200, null, null)
            : Response(false, 500, "Internal Server Error", null);
    }


    public async Task<ApiResponse> UpdatePatient(UpdatePatientDto updatePatientDto)
    {
        var patient = await _unitOfWork.Repository<PatientUser>()
            .GetEntityWithSpec(PatientSpecification.GetFullPatientData(updatePatientDto.UpdatePatientId));

        if (patient is null) return Response(false, 400, "Patient not found", null);

        _mapper.Map(updatePatientDto, patient.AppUser);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 200, null, null)
            : Response(false, 500, "Internal Server Error", null);
    }

    private async Task<bool> UserExists(string email)
    {
        return await _userManager.Users.AnyAsync(x => x.Email == email);
    }
}