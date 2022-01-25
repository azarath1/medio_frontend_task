import './Login.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice'
import moment from 'moment';
import { cityview } from '../features/userSlice';

const Login = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const dispatch = useDispatch();

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
  }

  return (
    <div className="Login">
      <button className='cities' onClick={cityViewer}>Városok</button>
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