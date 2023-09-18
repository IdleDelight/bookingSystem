import React, { useState } from 'react'; // Don't forget to import useEffect
import './BookingForm.css';

function BookingForm({ initialBooking = {}, onSubmit, onDelete, userId, setShowBookingForm }) {

    console.log("initialBooking.id:" + initialBooking?.id);

    // Default booking object
    const defaultBooking = {
        dateTimeStart: new Date(),
        dateTimeEnd: new Date(),
        userId: 1,
        roomId: 1,
        title: '',
        note: ''
    };

    // Merge initialBooking with defaultBooking to ensure every property has a value
    const booking = { ...defaultBooking, ...initialBooking };

    let initialDate = '';
    let initialTimeStart = '';
    let initialTimeEnd = '';

    if (booking.dateTimeStart && booking.dateTimeEnd) {
        let startDate = new Date(booking.dateTimeStart);
        let endDate = new Date(booking.dateTimeEnd);

        initialDate = startDate.toISOString().split('T')[0]; // Get date part in 'YYYY-MM-DD' format

        initialTimeStart = startDate.toTimeString().slice(0, 5); // Get start time part in 'HH:MM' format
        initialTimeEnd = endDate.toTimeString().slice(0, 5); // Get end time part in 'HH:MM' format
    }

    const { title = '' } = booking;

    const [titleState, setTitle] = useState(title);
    const [dateState, setDate] = useState(initialDate);
    const [dateTimeStartState, setDateTimeStart] = useState(initialTimeStart);
    const [dateTimeEndState, setDateTimeEnd] = useState(initialTimeEnd);


    const handleSubmit = (e) => {
        e.preventDefault();

        let startDateTime = new Date(`${dateState}T${dateTimeStartState}:00Z`).toISOString();
        let endDateTime = new Date(`${dateState}T${dateTimeEndState}:00Z`).toISOString();

        onSubmit({
            id: initialBooking ? initialBooking.id : null,
            title: titleState,
            note: "Default Note",
            dateTimeStart: startDateTime,
            dateTimeEnd: endDateTime,
            userId: userId,
            userName: "Default Username",
            roomId: '1',
            roomName: "Default Room Name"
        });

        setShowBookingForm(false);
    };

    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleDelete = () => {
        if (!confirmDelete) {
            setConfirmDelete(true);
        } else {
            setConfirmDelete(false);
        }
    };

    const handleConfirmDelete = () => {
        onDelete(initialBooking.id);
        setShowBookingForm(false);
    };

    const handleCancel = () => {
        if (confirmDelete) {
            setConfirmDelete(false);
        } else {
            setShowBookingForm(false);
        }
    };

    console.log("initialBooking.id:" + initialBooking?.id);

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-row">
                <label>
                    Title:
                    <input type="text" value={titleState} onChange={e => setTitle(e.target.value)} />
                </label>
            </div>
            <div className="form-row">
                <label>
                    Date:
                    <input type="date" value={dateState} onChange={e => setDate(e.target.value)} />
                </label>
            </div>
            <div className="form-row">
                <label>
                    Start Time:
                    <input type="time" min="07:00" max="16:30" step="1800" value={dateTimeStartState} onChange={e => setDateTimeStart(e.target.value)} />
                </label>
            </div>
            <div className="form-row">
                <label>
                    End Time:
                    <input type="time" min="07:30" max="17:00" step="1800" value={dateTimeEndState} onChange={e => setDateTimeEnd(e.target.value)} />
                </label>
            </div>

            <div className="button-row">
                <button type="submit">Submit</button>

                {initialBooking?.id
                    ? <button type="button" onClick={handleDelete} className={`delete-button ${confirmDelete ? 'confirm-delete-no' : ''}`}>{confirmDelete ? 'No' : 'Delete'}</button>
                    : <div></div>}

                <button type="button" onClick={confirmDelete ? handleConfirmDelete : handleCancel} className={confirmDelete ? 'confirm-delete-yes' : ''}>{confirmDelete ? 'Yes' : 'Cancel'}</button>
            </div>

        </form>
    );
}

export default BookingForm;
