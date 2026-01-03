using API.Extensions;
using AutoMapper;
using Core.DTOs;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;

namespace API.ApiServices;

public class CardService : BaseService, ICardService
{
    private readonly IMapper _mapper;
    private readonly IUnitOfWork _unitOfWork;
    private readonly IHttpContextAccessor _httpContextAccessor;

    public CardService(IMapper mapper, IUnitOfWork unitOfWork, IHttpContextAccessor httpContextAccessor)
    {
        _mapper = mapper;
        _unitOfWork = unitOfWork;
        _httpContextAccessor = httpContextAccessor;
    }

    public async Task<ApiResponse> CreateCard(CreateCardDto createCardDto)
    {
        var newCard = _mapper.Map<InsuranceCard>(createCardDto);

        newCard.PatientId = _httpContextAccessor.HttpContext!.User.GetUserId();

        var spec = PatientSpecification.GetFullPatientData(newCard.PatientId);

        var patientData = await _unitOfWork.Repository<PatientUser>().GetEntityWithSpec(spec);

        if (patientData is null) return Response(false, 400, "Patient not found");

        newCard.PatientName = patientData.AppUser.UserName!;

        _unitOfWork.Repository<InsuranceCard>().Add(newCard);

        var saved = await _unitOfWork.Complete();

        return saved

            ? Response(true, 201, "Created Successfully", _mapper.Map<CardDto>(newCard))

            : Response(false, 500, "Internal Server Error");
    }

    public async Task<ApiResponse> DeleteCard(int cardId)
    {
        var cardData = await _unitOfWork.Repository<InsuranceCard>().GetByIdAsync(cardId);

        if (cardData is null) return Response(false, 400, "Card Not Found");

        _unitOfWork.Repository<InsuranceCard>().Remove(cardData);

        var saved = await _unitOfWork.Complete();

        return saved 
            ? Response(true, 200)
            : Response(false, 500, "Internal Server Error");
    }

    public async Task<ApiResponse> GetCards()
    {
        var data = await _unitOfWork.Repository<InsuranceCard>().ListAllAsync();

        return Response(true, 200, null, _mapper.Map<List<CardDto>>(data));
    }
}