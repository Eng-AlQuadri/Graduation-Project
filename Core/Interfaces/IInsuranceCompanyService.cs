using Core.DTOs;
using Core.Specifications;

namespace Core.Interfaces;

public interface IInsuranceCompanyService
{
    public Task<ApiResponse> GetCompanies(CompanySpecParams companySpecParams);
    public Task<ApiResponse> CreateCompany(CreateCompanyDto createCompanyDto);
    public Task<ApiResponse> UpdateCompany(UpdateCompanyDto updateCompanyDto);
    public Task<ApiResponse> DeleteCompany(int companyId);
}