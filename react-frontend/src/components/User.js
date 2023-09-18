import React, { useState, useEffect } from 'react';
import './User.css';

function User({ users, currentUserIndex, setCurrentUserIndex }) {
  const [localUserIndex, setLocalUserIndex] = useState(currentUserIndex);

  useEffect(() => {
    setCurrentUserIndex(localUserIndex);
  }, [localUserIndex, setCurrentUserIndex]);

  useEffect(() => {
    if (users.length > 0 && localUserIndex >= users.length) {
      setLocalUserIndex(0);
    }
  }, [users, localUserIndex]);

  const handleNext = () => {
    setLocalUserIndex(prevIndex => {
      if (prevIndex + 1 >= users.length) {
        return 0;
      }
      return prevIndex + 1;
    });
  };

  return (
    <div className='user'>
      <button onClick={handleNext} className='user-cycler'>
        Current user: <strong>{users.length > 0 ? users[localUserIndex].name : 'Loading...'}</strong> | Click to cycle next user
      </button>
      <div>
        Hi, {users.length > 0 ? users[localUserIndex].name : 'Loading...'}! Book and manage your meetings at The Round Table.<br/>
        Click on a day to book a new meeting. Click on one of your meetings to edit it.
      </div>
    </div>
  );
}

export default User;
