﻿using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("GetAllAlbums")]
        public List<Album> GetAll()
        {
            return _context.Albums.ToList();
        }

        [HttpGet("GetAlbum/${id}")]
        public Album Get(Guid id)
        {
            var album = _context.Albums.Find(id);

            return album;
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
