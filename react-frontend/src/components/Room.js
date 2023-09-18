import React, { useState, useEffect } from 'react';

function Room({ rooms }) {
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);

  useEffect(() => {
    if (rooms.length > 0 && currentRoomIndex >= rooms.length) {
      setCurrentRoomIndex(0);
    }
  }, [rooms, currentRoomIndex]);

  const handleNext = () => {
    setCurrentRoomIndex(prevIndex => {
      if (prevIndex + 1 >= rooms.length) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  return (
    <div className='room'>
      <button onClick={handleNext} className='room-cycler'>
        Current room: <strong>{rooms.length > 0 ? rooms[currentRoomIndex].name : 'Loading...'}</strong> | Click to cycle next room
      </button>
    </div>
  );
}

export default Room;
