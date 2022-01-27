import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../store/slices/userSlice';
import moment from 'moment';
import '../login/Login.css';
import { cityview, logoutSite } from '../../store/slices/siteInfo';
import { Link } from 'react-router-dom';

const UserPage = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
    dispatch(logoutSite());
  }

  return (
    <div className="Login">
      <Link onClick={cityViewer} to="/cities"><button>Városok</button></Link>
      <div className="formcontainer">
        <h1>Üdv <span>{user.userName}</span>!</h1>
        <p>Felhasználónév: {user.userName}</p>
        <p>Email: {user.email}</p>
        <p id="online">Online: <span>{moment().diff(user.onlineSince, 'days')} napja</span></p>{/* checking online presence for days */}
        <Link to="/" onClick={(event) => handleLogout(event)}><button>Kilépés</button></Link>
      </div>
    </div>
  );

  function cityViewer() {
    dispatch(cityview());
  }

}

export default UserPage;