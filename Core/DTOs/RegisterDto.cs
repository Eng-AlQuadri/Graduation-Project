using System.ComponentModel.DataAnnotations;

namespace Core.DTOs;

public class RegisterDto
{
    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid Email")]
    public string Email { get; set; } = null!;

    [Required]
    public string Password { get; set; } = null!;

    // [Compare("Password", ErrorMessage = "Passwords do not match")]
    [Required]
    [StringLength(10, MinimumLength = 10)]
    [RegularExpression(@"^\d{10}$", ErrorMessage = "Phone number must be exactly 10 digits.")]
    public string PhoneNumber { get; set; } = null!;

    [Required]
    [StringLength(25, MinimumLength = 3, ErrorMessage ="Length between 3 and 25 characters")]
    public string Username { get; set; } = null!;
}