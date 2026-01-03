using Core.DTOs;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class CardController : BaseApiController
{
    private readonly ICardService _cardService;

    public CardController(ICardService cardService)
    {
        _cardService = cardService;
    }


    [Authorize(Policy = "RequirePatientRole")]
    [HttpGet]
    public async Task<IActionResult> GetCards()
    {
        var response = await _cardService.GetCards();

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequirePatientRole")]
    [HttpPost]
    public async Task<IActionResult> CreateCard(CreateCardDto createCardDto)
    {
        var response = await _cardService.CreateCard(createCardDto);

        return StatusCode(response.StatusCode, response);
    }


    [Authorize(Policy = "RequirePatientRole")]
    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteCard(int id)
    {
        var response = await _cardService.DeleteCard(id);

        return StatusCode(response.StatusCode, response);
    }
}