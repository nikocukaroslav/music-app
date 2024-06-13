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

        [HttpGet("GetAllMusic", Name = "GetAllMusic")]
        public List<Music> GetAll()
        {
            return _context.Musics.ToList();
        }

        [HttpGet("{id}", Name = "GetMusic")]
        public Music Get(Guid id)
        {
            return _context.Musics.Find(id);
        }

        [HttpPost("Add", Name = "AddMusic")]
        public Music Add(Music music)
        {
            _context.Add(music);
            _context.SaveChanges();

            return music;
        }

        [HttpDelete(Name = "DeleteMusic")]
        public void Delete(Guid id)
        {
            _context.Remove(id);
            _context.SaveChanges();
        }

        [HttpPost("Upload", Name = "UploadMusic")]
        public async Task<JsonResult> UploadMusic(IFormFile file)
        {
            var musicUrl = await _musicRepository.UploadMusic(file);

            return new JsonResult(new { link = musicUrl });
        }
    }
}
