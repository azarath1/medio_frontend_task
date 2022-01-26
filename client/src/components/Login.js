import './Login.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice'
import moment from 'moment';
import { cityview, loginSite } from '../features/siteInfo';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    const response = await fetch('http://localhost:4000/login', {
      method: 'post',
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Credentials': 'true',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        "email": email,
        "password": password
      }),
    })
    const data = await response.json();
    await dispatch(login({
      userId: data.userid,
      userName: data.username,
      email: email,
      onlineSince: moment.now()
    }))
    await dispatch(loginSite());
    navigate("/userpage");
  }

  return (
    <div className="Login">
      <Link onClick={cityViewer} to="/cities"><button>Városok</button></Link>
      <div className="formcontainer">
        <h1>Welcome</h1>

        <form className="form" onSubmit={handleSubmit}>
          <input name="email" type="text" placeholder="Email" onChange={event => setEmail(event.target.value)}></input>
          <input name="password" type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}></input>
          <button type="submit" id="login-button">Login</button>
        </form>
      </div>
    </div>
  );

  function cityViewer() {
    dispatch(cityview());
  }
}

export default Login;