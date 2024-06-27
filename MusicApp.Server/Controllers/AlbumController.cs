using Microsoft.AspNetCore.Mvc;
using MusicApp.Server.Models;
using Save__plan_your_trips.Data;
using System.Linq;

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

        [HttpGet("GetAll")]
        public List<Album> GetAll()
        {
            return _context.Albums.ToList();
        }
        
        [HttpGet("Get/{id}")]
        public Album Get(Guid id)
        {
            var album = _context.Albums.Find(id);

            return album;
        }

        [HttpPatch("Update")]
        public Album Update(Album album)
        {
           var albumToEdit =   _context.Albums.FirstOrDefault(a => a.Id == album.Id);

            if (albumToEdit != null)
            {
                albumToEdit.Id= album.Id;
                albumToEdit.MusicList = album.MusicList;

                _context.SaveChanges();

                return albumToEdit;
            }

            return null;
        }

        [HttpPost("Add")]
        public Album Add(Album album)
        {
            _context.Add(album);
            _context.SaveChanges();

            return album;
        }

        [HttpDelete("Delete/{id}")]
        public void Delete(Guid id)
        {
            var albumToDelete = _context.Albums.Find(id);

            if (albumToDelete != null)
            {
                _context.Remove(albumToDelete);
                _context.SaveChanges();
            }
            else throw new Exception("Can't delete album");
        }
    }
}