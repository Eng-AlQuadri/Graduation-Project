using API.Helpers;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;

namespace API.ApiServices;

public class BaseService
{
    public BaseService() { }

    protected async Task<Pagination<T>> CreatePagedResult<T>(IGenericRepository<T> repo, 
        ISpecification<T> spec, int pageIndex, int pageSize) where T : BaseEntity
    {
        var items = await repo.ListAsync(spec);
        var count = await repo.CountAsync(spec);

        var pagination = new Pagination<T>(pageIndex, pageSize, count, items);

        return pagination;
    }

    protected async Task<Pagination<TDto>> CreatePagedResult<T, TDto>(IGenericRepository<T> repo,
        ISpecification<T> spec, int pageIndex, int pageSize, IMapper mapper)
            where T : BaseEntity
    {
        var items = await repo.ListAsync(spec);
        var count = await repo.CountAsync(spec);

        var dtoItems = mapper.Map<List<TDto>>(items);

        var pagination = new Pagination<TDto>(pageIndex, pageSize, count, dtoItems);

        return pagination;
    }

    protected ApiResponse Response(bool success, int statusCode, string? message = null, object? data = null)
    {
        var response = new ApiResponse
        {
            Success = success,
            StatusCode = statusCode,
            Message = message,
            Data = data
        };

        return response;
    }
}