using System.ComponentModel.DataAnnotations;

namespace Core.DTOs;

public class UpdateDeliveryWorkerDto
{
    [Required]
    public int UpdateDoctorId { get; set; }
    [Required]
    public string UserName { get; set; } = string.Empty;
    [Required]
    public string Email { get; set; } = string.Empty;
    [Required]
    public string PhoneNumber { get; set; } = string.Empty;
}