using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bookingApp.Data;
using bookingApp.Models;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly BookingContext _context;

    public UsersController( BookingContext context )
    {
        _context = context;
    }

    // GET: api/Users
    [HttpGet]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _context.Users.ToListAsync();
    }

    // GET: api/Users/1 (example)
    [HttpGet("{id}")]
    public async Task<ActionResult<User>> GetUserById( int id )
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null) {
            return NotFound();
        }

        return user;
    }

    // GET: api/Users/UserName/1 (example)
    [HttpGet("UserName/{id}")]
    public async Task<ActionResult<string>> GetUserNameById( int id )
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null) {
            return NotFound();
        }

        return user.Name;
    }
}
