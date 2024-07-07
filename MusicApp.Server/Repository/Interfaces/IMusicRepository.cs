using Microsoft.AspNetCore.Mvc;

namespace MusicApp.Server.Repository.Interfaces
{
    public interface IMusicRepository
    {
        Task<string> UploadMusic(IFormFile file, [FromForm] Guid userId);
        Task DeleteMusic(Guid id);
    }
}
