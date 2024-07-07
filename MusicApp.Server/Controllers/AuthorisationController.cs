using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicApp.Server.Models;
using Save__plan_your_trips.Data;
using System.Text.Json.Nodes;

namespace MusicApp.Server.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class AuthorisationController : ControllerBase
    {
        private readonly MusicAppDbContext _context;

        public AuthorisationController(MusicAppDbContext musicAppDbContext)
        {
            _context = musicAppDbContext;
        }

        [HttpPost("CreateUser")]
        public async Task<IActionResult> Add(User user)
        {
            var userWithSameId = await _context.Users.FirstOrDefaultAsync(u => u.Login == user.Login);

            if (userWithSameId == null)
            {
                _context.Add(user);
                _context.SaveChanges();

                return Ok(new { newUser = user });
            }

            return BadRequest(new { error = "Already exist" });
        }

        [HttpPost("Identify")]
        public async Task<IActionResult> Login(User user)
        {
            var userToLogin = await _context.Users.FirstOrDefaultAsync(u => u.Login == user.Login);

            if (userToLogin != null)
            {
                if (userToLogin.Password == user.Password)
                {
                    return Ok(new { status = "authorized", id = userToLogin.Id, login = userToLogin.Login });
                }
            }

            return Unauthorized(new { status = "unauthorized" });
        }
    }
}