namespace Core.DTOs;

public class ApiResponse
{
    public bool Success { get; set; }
    public int StatusCode { get; set; }
    public string? Message { get; set; } = string.Empty;
    public object? Data { get; set; }
}