import React from 'react';

function Booking({ bookings }) {
    return (
        <div>
            {bookings && bookings.length > 0 ? bookings[0].title : 'Loading...'}
        </div>
    );
}

export default Booking;