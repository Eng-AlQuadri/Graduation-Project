using Core.DTOs;

namespace Core.Interfaces;

public interface ICardService
{
    public Task<ApiResponse> GetCards();
    public Task<ApiResponse> CreateCard(CreateCardDto createCardDto);
    public Task<ApiResponse> DeleteCard(int companyId);
}