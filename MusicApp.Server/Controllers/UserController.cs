using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicApp.Server.Models;
using Save__plan_your_trips.Data;

namespace MusicApp.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly MusicAppDbContext _context;

        public UserController(MusicAppDbContext musicAppDbContext)
        {
            _context = musicAppDbContext;
        }
        [HttpPost(Name = "AddUser")]
        public User Add(User user)
        {
            _context.Add(user);
            _context.SaveChanges();

            return user;
        }
    }
}
