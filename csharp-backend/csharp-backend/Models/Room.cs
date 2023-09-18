namespace bookingApp.Models
{
    public class Room
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Capacity { get; set; }
        public List<Booking> Bookings { get; set; }
    }

}
