import React, { useState, useEffect } from 'react';
import './App.css';
import User from './components/User';
import Room from './components/Room';
import Calendar from './components/Calendar';
import BookingForm from './components/BookingForm';

function App() {
  const [users, setUsers] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [editingBooking, setEditingBooking] = useState(null);
  const [showBookingForm, setShowBookingForm] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('https://localhost:7096/Users');
      const data = await response.json();
      setUsers(data.$values);
    };

    const fetchRooms = async () => {
      const response = await fetch('https://localhost:7096/Rooms');
      const data = await response.json();
      setRooms(data);
    };

    const fetchBookings = async () => {
      const response = await fetch('https://localhost:7096/api/Bookings');
      const data = await response.json();
      const adjustedData = data.$values.map(booking => {
        const startDateTime = new Date(booking.dateTimeStart);
        startDateTime.setHours(startDateTime.getHours() - 2);
        const endDateTime = new Date(booking.dateTimeEnd);
        endDateTime.setHours(endDateTime.getHours() - 2);
        return {
          ...booking,
          dateTimeStart: startDateTime.toISOString(),
          dateTimeEnd: endDateTime.toISOString(),
        };
      });
      setBookings(adjustedData);
    };

    fetchUsers();
    fetchRooms();
    fetchBookings();
  }, []);

  // POST booking method
  const createBooking = booking => {
    booking.userId = parseInt(booking.userId);
    booking.roomId = parseInt(booking.roomId);
    delete booking.id; // server should generate this

    console.log('POST request body:', booking);

    fetch('https://localhost:7096/api/Bookings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    })
      .then(response => response.json())
      .then(data => {
        setBookings([...bookings, data]);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // PUT booking method
  const updateBooking = booking => {
    booking.userId = parseInt(booking.userId);
    booking.roomId = parseInt(booking.roomId);

    console.log('PUT request body:', booking);

    fetch(`https://localhost:7096/api/Bookings/${booking.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(booking),
    })
      .then(response => {
        if (response.ok) {
          // Directly update local state, as the server might not return updated data
          setBookings(bookings.map(item => item.id === booking.id ? booking : item));
          setEditingBooking(null); // Clear the editing state after the update
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  // DELETE booking method
  const deleteBooking = (id) => {
    fetch(`https://localhost:7096/api/Bookings/${id}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Remove the booking from the local state
          setBookings(bookings.filter(booking => booking.id !== id));
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleBookingSubmit = booking => {
    if (editingBooking) {
      updateBooking(booking);
    } else {
      createBooking(booking);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
      </header>

      <div className="App-body">
        <User users={users} currentUserIndex={currentUserIndex} setCurrentUserIndex={setCurrentUserIndex} />
        <div className="calendar-container">
          <Calendar bookings={bookings} currentUser={users[currentUserIndex]} setEditingBooking={setEditingBooking} setShowBookingForm={setShowBookingForm} />
          {showBookingForm && (
            <div className="booking-form-popup">
              <div className="booking-form-content">
                <BookingForm initialBooking={editingBooking} onSubmit={handleBookingSubmit} onDelete={deleteBooking} userId={users[currentUserIndex].id} setShowBookingForm={setShowBookingForm} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;