using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using MusicApp.Server.Models;
using static System.Net.Mime.MediaTypeNames;

namespace Save__plan_your_trips.Data
{
    public class MusicAppDbContext : DbContext
    {
        public MusicAppDbContext(DbContextOptions<MusicAppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Album> Albums { get; set; }
        public DbSet<Music> Musics { get; set; }

    }
}