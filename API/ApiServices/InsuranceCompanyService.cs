using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Infrastructure.Services;

namespace API.ApiServices;

public class InsuranceCompanyService : BaseService, IInsuranceCompanyService 
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;

    public InsuranceCompanyService(IMapper mapper, IUnitOfWork unitOfWork)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
    }

    public async Task<ApiResponse> CreateCompany(CreateCompanyDto createCompanyDto)
    {
        var newCompany = _mapper.Map<InsuranceCompany>(createCompanyDto);

        _unitOfWork.Repository<InsuranceCompany>().Add(newCompany);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 201, null, _mapper.Map<CompanyDto>(newCompany))
            : Response(false, 500, "Internal Server Error", null);    
    }

    public async Task<ApiResponse> DeleteCompany(int companyId)
    {
        var companyData = await _unitOfWork.Repository<InsuranceCompany>().GetByIdAsync(companyId);

        if (companyData is null) return Response(false, 400, "Company Not Found", null);

        _unitOfWork.Repository<InsuranceCompany>().Remove(companyData);

        var saved = await _unitOfWork.Complete();

        return saved 
            ? Response(true, 200, null, null)
            : Response(false, 500, "Internal Server Error", null);  
    }

    public async Task<ApiResponse> GetCompanies(CompanySpecParams companySpecParams)
    {
        var data = await _unitOfWork.Repository<InsuranceCompany>().ListAllAsync();

        return Response(true, 200, null, _mapper.Map<List<CompanyDto>>(data));
    }

    public async Task<ApiResponse> UpdateCompany(UpdateCompanyDto updateCompanyDto)
    {
        var company = await _unitOfWork.Repository<InsuranceCompany>().GetByIdAsync(updateCompanyDto.Id);

        if (company is null) return Response(false, 400, "Company not found");

        _mapper.Map(updateCompanyDto, company);

        _unitOfWork.Repository<InsuranceCompany>().Update(company);

        var saved = await _unitOfWork.Complete();

        return saved
            ? Response(true, 200)
            : Response(false, 500, "Internal Server Error");
    }
}