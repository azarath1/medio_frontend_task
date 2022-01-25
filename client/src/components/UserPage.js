import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../features/userSlice';
import moment from 'moment';
import './Login.css';
import { cityview } from '../features/userSlice';

const UserPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
  }

  return (
    <div className="Login">
      <button className='cities' onClick={cityViewer}>Városok</button>
      <div className="formcontainer">
        <h1>Welcome <span>{user.userName}</span>!</h1>
        <p>Username: {user.userName}</p>
        <p>Email: {user.email}</p>
        <p id="online">Online since: <span>{moment().diff(user.onlineSince, 'days')} days</span></p>{/* checking online presence for days */}
        <button onClick={(event) => handleLogout(event)}>Kilépés</button>
      </div>
    </div>
  );

  function cityViewer() {
    dispatch(cityview());
  }

}

export default UserPage;