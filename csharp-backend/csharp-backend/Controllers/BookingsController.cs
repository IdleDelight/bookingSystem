using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using bookingApp.Data;
using bookingApp.Models;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class BookingsController : ControllerBase
{
    private readonly BookingContext _context;

    public BookingsController( BookingContext context )
    {
        _context = context;
    }

    // GET: api/Bookings
    [HttpGet]
    public async Task<ActionResult<IEnumerable<BookingDTO>>> GetBookings()
    {
        var bookings = await _context.Bookings
            .Include(b => b.User)  // Include the associated User
            .Include(b => b.Room)  // Include the associated Room
            .ToListAsync();

        // Map each Booking to a BookingDTO
        var bookingDTOs = bookings.Select(booking => new BookingDTO
        {
            Id = booking.Id,
            Title = booking.Title,
            Note = booking.Note,
            DateTimeStart = booking.DateTimeStart,
            DateTimeEnd = booking.DateTimeEnd,
            UserId = booking.UserId,
            UserName = booking.User.Name,
            RoomId = booking.RoomId,
            RoomName = booking.Room.Name
        });

        return Ok(bookingDTOs);
    }


    // GET: api/Bookings/5
    [HttpGet("{id}")]
    public async Task<ActionResult<BookingDTO>> GetBooking( int id )
    {
        var booking = await _context.Bookings
            .Include(b => b.User)  // Include the associated User
            .Include(b => b.Room)  // Include the associated Room
            .FirstOrDefaultAsync(b => b.Id == id);

        if (booking == null) {
            return NotFound();
        }

        // Map Booking to a BookingDTO
        var bookingDTO = new BookingDTO
        {
            Id = booking.Id,
            Title = booking.Title,
            Note = booking.Note,
            DateTimeStart = booking.DateTimeStart,
            DateTimeEnd = booking.DateTimeEnd,
            UserId = booking.UserId,
            UserName = booking.User.Name,
            RoomId = booking.RoomId,
            RoomName = booking.Room.Name
        };

        return Ok(bookingDTO);
    }


    // POST: api/Bookings
    [HttpPost]
    public async Task<ActionResult<Booking>> PostBooking( BookingDTO bookingDTO )
    {
        // Fetch the associated User and Room based on the IDs from the DTO
        var user = await _context.Users.FindAsync(bookingDTO.UserId);
        var room = await _context.Rooms.FindAsync(bookingDTO.RoomId);

        if (user == null || room == null) {
            return BadRequest("User or Room not found.");
        }

        // Create a new Booking entity
        var booking = new Booking
        {
            Id = bookingDTO.Id,
            Title = bookingDTO.Title,
            Note = bookingDTO.Note,
            DateTimeStart = bookingDTO.DateTimeStart,
            DateTimeEnd = bookingDTO.DateTimeEnd,
            User = user,
            Room = room
        };

        // Add to database and save changes
        _context.Bookings.Add(booking);
        await _context.SaveChangesAsync();

        // Return successful response
        return CreatedAtAction(nameof(GetBooking), new { id = booking.Id }, booking);
    }

    // PUT: api/Bookings/5
    [HttpPut("{id}")]
    public async Task<IActionResult> PutBooking( int id, BookingDTO bookingDTO )
    {
        if (id != bookingDTO.Id) {
            return BadRequest();
        }

        // Fetch the existing Booking from the database
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null) {
            return NotFound();
        }

        // Update the Booking's properties with the details from the DTO
        booking.Title = bookingDTO.Title;
        booking.Note = bookingDTO.Note;
        booking.DateTimeStart = bookingDTO.DateTimeStart;
        booking.DateTimeEnd = bookingDTO.DateTimeEnd;

        // Fetch the associated User and Room based on the IDs from the DTO
        var user = await _context.Users.FindAsync(bookingDTO.UserId);
        var room = await _context.Rooms.FindAsync(bookingDTO.RoomId);

        if (user == null || room == null) {
            return BadRequest("User or Room not found.");
        }

        booking.User = user;
        booking.Room = room;

        try {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException) {
            if (!BookingExists(id)) {
                return NotFound();
            }
            else {
                throw;
            }
        }

        return NoContent();
    }

    // DELETE: api/Bookings/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteBooking( int id )
    {
        var booking = await _context.Bookings.FindAsync(id);
        if (booking == null) {
            return NotFound();
        }

        _context.Bookings.Remove(booking);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private bool BookingExists( int id )
    {
        return _context.Bookings.Any(e => e.Id == id);
    }
}