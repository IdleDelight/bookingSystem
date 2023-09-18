using bookingApp.Models;
using Microsoft.EntityFrameworkCore;

namespace bookingApp.Data
{
    public class BookingContext : DbContext
    {
        public BookingContext( DbContextOptions<BookingContext> options )
             : base(options)
        {
        }
        public DbSet<User> Users { get; set; }
        public DbSet<Booking> Bookings { get; set; }
        public DbSet<Room> Rooms { get; set; }

        protected override void OnModelCreating( ModelBuilder modelBuilder )
        {
            modelBuilder.Entity<User>()
                .HasIndex(u => u.Email)
                .IsUnique();

            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Email = "lancelot@spamalotmail.com", Name = "SirLancelot" },
                new User { Id = 2, Email = "gawain@spamalotmail.com", Name = "SirGawain" },
                new User { Id = 3, Email = "arthur@spamalotmail.com", Name = "KingArthur" },
                new User { Id = 4, Email = "merlin@spamalotmail.com", Name = "Merlin" }
                );

            modelBuilder.Entity<Room>().HasData(
                new Room { Id = 1, Name = "The Round Table", Capacity = 12 },
                new Room { Id = 2, Name = "The Great Hall", Capacity = 20 },
                new Room { Id = 3, Name = "The Chapel", Capacity = 8 },
                new Room { Id = 4, Name = "The Library", Capacity = 8 }
                );
            modelBuilder.Entity<Booking>().HasData(
                new Booking { Id = 1, Note = "A Note", Title = "A Title", DateTimeStart = "2023-07-24T15:00:05Z", DateTimeEnd = "2023-07-24T16:00:05Z", UserId = 1, RoomId = 1,},
                new Booking { Id = 2, Note = "A Note", Title = "A Title", DateTimeStart = "2023-07-25T12:07:05Z", DateTimeEnd = "2023-07-25T13:07:35Z", UserId = 2, RoomId = 1, },
                new Booking { Id = 3, Note = "A Note", Title = "A Title", DateTimeStart = "2023-07-26T08:10:05Z", DateTimeEnd = "2023-07-26T08:22:05Z", UserId = 2, RoomId = 1, },
                new Booking { Id = 4, Note = "A Note", Title = "A Title", DateTimeStart = "2023-07-27T10:17:05Z", DateTimeEnd = "2023-07-27T12:17:05Z", UserId = 4, RoomId = 1, }
                );
        }
    }
}