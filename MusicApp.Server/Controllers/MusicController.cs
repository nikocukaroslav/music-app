using Microsoft.AspNetCore.Mvc;
using MusicApp.Server.Models;
using Save__plan_your_trips.Data;

namespace MusicApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MusicController : ControllerBase
    {
        private readonly MusicAppDbContext _context;

        public MusicController(MusicAppDbContext musicAppDbContext)
        {
            _context = musicAppDbContext;
        }

        [HttpGet(Name = "GetMusics")]
        public List<Music> GetAll()
        {
            return _context.Musics.ToList();
        }

        [HttpGet("{id}", Name = "GetMusic")]
        public Music Get(Guid id)
        {
            return _context.Musics.Find(id);
        }

        [HttpPost(Name = "AddMusic")]
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
    }
}
