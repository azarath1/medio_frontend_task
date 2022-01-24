import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';

const UserPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  }

  return (
    <div className="Userpage">
      <div className="container">
        <h1>Welcome <span>{user.userName}</span>!</h1>
        <p>Username: {user.userName}</p>
        <p>Email: {user.email}</p>
        <p>Online since: <span>{1}</span> days</p>
        <button onClick={(event) => handleLogout(event)}>Logout</button>
      </div>
    </div>
  );
}

export default UserPage;