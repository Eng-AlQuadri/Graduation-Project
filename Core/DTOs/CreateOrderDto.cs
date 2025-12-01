using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Core.DTOs;

public class CreateOrderDto
{
    [FromForm(Name = "prescription")]
    public IFormFile Prescription { get; set; } = null!;

    [FromForm(Name = "address")]
    public string Address { get; set; } = null!;

    [FromForm(Name = "orderDetails")]
    public string OrderDetails { get; set; } = null!; // JSON string
}