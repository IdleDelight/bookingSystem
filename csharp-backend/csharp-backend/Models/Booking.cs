using csharp_backend.Models;

namespace bookingApp.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Note { get; set; }
        public string DateTimeStart { get; set; }
        public string DateTimeEnd { get; set; }
        public int UserId { get; set; }
        public User User { get; set; }
        public int RoomId { get; set; }
        public Room Room { get; set; }
    }

    public class BookingDTO
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Note { get; set; }
        public string DateTimeStart { get; set; }
        public string DateTimeEnd { get; set; }
        public int UserId { get; set; }
        public string UserName { get; set; }
        public int RoomId { get; set; }
        public string RoomName { get; set; }
    }
}
