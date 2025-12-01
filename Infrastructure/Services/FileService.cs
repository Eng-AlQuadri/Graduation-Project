using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;

namespace Infrastructure.Services;

public class FileService
{
    private readonly IWebHostEnvironment _env;

    public FileService(IWebHostEnvironment env)
    {
        _env = env;
    }


    public async Task<string> SavePrescriptionAsync(IFormFile file)
    {
        if (file is null || file.Length == 0) return null!;

        var folderPath = Path.Combine(_env.WebRootPath, "prescriptions");

        if (!Directory.Exists(folderPath)) Directory.CreateDirectory(folderPath);

        var extension = Path.GetExtension(file.FileName);

        var fileName = $"{Guid.NewGuid()}{extension}";

        var fullPath = Path.Combine(folderPath, fileName);

        using (var stream = new FileStream(fullPath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return $"/prescriptions/{fileName}";
    }
}