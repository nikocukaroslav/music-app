using Microsoft.AspNetCore.Mvc;
using MusicApp.Server.Models;
using Save__plan_your_trips.Data;

namespace MusicApp.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class AlbumController : ControllerBase
    {
        private readonly MusicAppDbContext _context;

        public AlbumController(MusicAppDbContext musicAppDbContext)
        {
            _context = musicAppDbContext;
        }

        [HttpGet(Name = "GetAlbums")]
        public List<Album> GetAll()
        {
            return _context.Albums.ToList();
        }

        [HttpPost(Name = "AddAlbum")]
        public Album Add(Album album)
        {
            _context.Add(album);
            _context.SaveChanges();

            return album;
        }

        [HttpDelete(Name = "DeleteAlbum")]
        public void Delete(Guid id)
        {
            _context.Remove(id);
            _context.SaveChanges();
        }
    }
}
