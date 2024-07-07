using Microsoft.AspNetCore.Mvc;
using MusicApp.Server.Models;
using MusicApp.Server.Repository.Interfaces;
using Save__plan_your_trips.Data;

namespace MusicApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MusicController : ControllerBase
    {
        private readonly MusicAppDbContext _context;
        private readonly IMusicRepository _musicRepository;

        public MusicController(MusicAppDbContext musicAppDbContext, IMusicRepository musicRepository)
        {
            _context = musicAppDbContext;
            _musicRepository = musicRepository;
        }

        [HttpGet("GetAll/{userId}")]
        public List<Music> GetAll(Guid userId)
        {
            return _context.Musics.Where(x=> x.UserId == userId).ToList();
        }

        [HttpPost("Upload")]
        public async Task<JsonResult> UploadMusic(List<IFormFile> files, [FromForm] Guid userId)
        {
            var musicUrls = new List<string>();

            foreach (var file in files)
            {
                var musicUrl = await _musicRepository.UploadMusic(file, userId);
                musicUrls.Add(musicUrl);
            }
            return new JsonResult(new { link = musicUrls });
        }

        [HttpDelete("Delete/{id}")]
        public async Task Delete(Guid id)
        {
            await _musicRepository.DeleteMusic(id);
        }

    }
}
