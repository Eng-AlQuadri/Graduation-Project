using API.Extensions;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.ApiServices;

public class DoctorService : BaseService, IDoctorService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly UserManager<AppUser> _userManager;

    public DoctorService(IMapper mapper, IUnitOfWork unitOfWork,
        IHttpContextAccessor httpContextAccessor, UserManager<AppUser> userManager)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _userManager = userManager;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<ApiResponse> CreateDoctor(CreateDoctorDto createDoctorDto)
    {
        if (await UserExists(createDoctorDto.Email))
        {
            return Response(false, 400, "Please choose another email", null);
        }

        var user = _mapper.Map<AppUser>(createDoctorDto);

        var result = await _userManager.CreateAsync(user, "Pa$$w0rd");

        if (!result.Succeeded)
        {
            return Response(false, 400, string.Join(", ", result.Errors.Select(e => e.Description)), null);
        }

        var roleResult = await _userManager.AddToRoleAsync(user, "Doctor");

        if (!roleResult.Succeeded)
        {
            return Response(false, 400, string.Join(", ", result.Errors.Select(e => e.Description)), null);
        }

        var doctor = new DoctorUser
        {
            AppUserId = user.Id,
            Id = user.Id,
            AppUser = user
        };

        _unitOfWork.Repository<DoctorUser>().Add(doctor);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 201, null, _mapper.Map<DoctorDto>(doctor))
            : Response(false, 500, "Internal Server Error", null);
    }

    public async Task<ApiResponse> DeleteDoctor(int id)
    {
        var doctor = await _unitOfWork.Repository<DoctorUser>()
            .GetEntityWithSpec(DoctorSpecification.GetFullDoctorData(id));

        if (doctor is null) return Response(false, 400, "User not found", null);

        var result = await _userManager.DeleteAsync(doctor.AppUser);

        if (!result.Succeeded) return Response(false, 400, "Cannot delete doctor, may be he have related records");

        return Response(true, 200, null, null);
    }

    public async Task<ApiResponse> GetDoctorById(int id)
    {
        var doctor = await _unitOfWork.Repository<DoctorUser>()
            .GetEntityWithSpec(DoctorSpecification.GetFullDoctorData(id));

        if (doctor is null) return Response(false, 400, "Doctor not found");

        return Response(true, 200, null, _mapper.Map<DoctorDto>(doctor));   
    }

    public async Task<ApiResponse> GetDoctors(DoctorSpecParams doctorSpecParams)
    {
        var spec = DoctorSpecification.GetAllDoctors(doctorSpecParams);

        var data = await CreatePagedResult<DoctorUser, DoctorDto>(_unitOfWork.Repository<DoctorUser>(), spec,
            doctorSpecParams.PageIndex, doctorSpecParams.PageSize, _mapper);

        return Response(true, 200, null, data);    
    }

    public Task<ApiResponse> GetMyProfile()
    {
        throw new NotImplementedException();
    }

    public async Task<ApiResponse> UpdateDoctor(UpdateDoctorDto updateDoctorDto)
    {
        var doctor = await _unitOfWork.Repository<DoctorUser>()
            .GetEntityWithSpec(DoctorSpecification.GetFullDoctorData(updateDoctorDto.UpdateDoctorId));

        if (doctor is null) return Response(false, 400, "Doctor not found", null);

        _mapper.Map(updateDoctorDto, doctor.AppUser);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 200, null, null)
            : Response(false, 500, "Internal Server Error", null);    
    }

    public async Task<ApiResponse> UpdateMyProfile(UpdateDoctorDto updateDoctorDto)
    {
        var doctor = await _unitOfWork.Repository<DoctorUser>()
            .GetEntityWithSpec(DoctorSpecification
                .GetFullDoctorData(_httpContextAccessor.HttpContext!.User.GetUserId()));

        if (doctor is null) return Response(false, 400, "Doctor not found", null);

        _mapper.Map(updateDoctorDto, doctor.AppUser);

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