using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bookingApp.Data;
using bookingApp.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("[controller]")]
public class RoomsController : ControllerBase
{
    private readonly BookingContext _context;

    public RoomsController( BookingContext context )
    {
        _context = context;
    }

    // GET: api/Rooms
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Room>>> GetRooms()
    {
        return await _context.Rooms.ToListAsync();
    }

    // GET: api/Rooms/1 (example)
    [HttpGet("{id}")]
    public async Task<ActionResult<Room>> GetRoomById( int id )
    {
        var room = await _context.Rooms.FindAsync(id);

        if (room == null) {
            return NotFound();
        }

        return room;
    }

    // GET: api/Rooms/RoomName/1 (example)
    [HttpGet("RoomName/{id}")]
    public async Task<ActionResult<string>> GetRoomNameById( int id )
    {
        var room = await _context.Rooms.FindAsync(id);

        if (room == null) {
            return NotFound();
        }

        return room.Name;
    }
}
