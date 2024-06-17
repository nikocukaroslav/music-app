namespace MusicApp.Server.Repository.Interfaces
{
    public interface IMusicRepository
    {
        Task<string> UploadMusic(IFormFile file);
        Task DeleteMusic(Guid id);
    }
}
