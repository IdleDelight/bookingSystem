namespace bookingApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public List<Booking> Bookings { get; set; }
    }

}
