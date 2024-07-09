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
    public class AuthorizationController : ControllerBase
    {
        private readonly MusicAppDbContext _context;

        public AuthorizationController(MusicAppDbContext musicAppDbContext)
        {
            _context = musicAppDbContext;
        }

        [HttpPost("CreateUser")]
        public async Task<IActionResult> Add(User user)
        {
            var userWithSameLogin = await _context.Users.FirstOrDefaultAsync(u => u.Login == user.Login);

            if (userWithSameLogin == null)
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

        [HttpPatch("ChangeLogin")]
        public async Task<IActionResult> ChangeLogin(User user)
        {
            var userToUpdate = await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);
            var userWithSameLogin = await _context.Users.FirstOrDefaultAsync(u => u.Login == user.Login);

            if (userToUpdate != null && userWithSameLogin == null)
            {
                if (userToUpdate.Password == user.Password)
                {
                    userToUpdate.Login = user.Login;
                    _context.SaveChanges();

                    return Ok(new { status = "successful" });
                }
            }

            return BadRequest(new { status = "rejected" });
        }

        [HttpPatch("ChangePassword")]
        public async Task<IActionResult> ChangePassword(User user)
        {
            var userToUpdate = await _context.Users.FirstOrDefaultAsync(u => u.Id == user.Id);

            if (userToUpdate != null)
            {
                if (userToUpdate.Password == user.Password)
                {
                    userToUpdate.Password = user.Login;
                    _context.SaveChanges();

                    return Ok(new { status = "successful" });
                }
            }

            return BadRequest(new { status = "rejected" });
        }

        [HttpDelete("DeleteUser/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            var userToDelete = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (userToDelete != null)
            {
                _context.Users.Remove(userToDelete);
                _context.SaveChanges();

                return Ok(new { status = "successful" });
            }

            return BadRequest(new { status = "rejected" });
        }
    }
}