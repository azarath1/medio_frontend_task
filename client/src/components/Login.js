import './Login.css';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice'

const Login = () => {
  const [email, setEmail] = useState("Email");
  const [password, setPassword] = useState("Password");
  // const [userid, setId] = useState(0);
  // const [username, setUser] = useState("");
  
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
      // .then(res => res.json())
      // .then(console.log);
    
    await dispatch(login({
      userId: data.userid,
      userName: data.username,
      email: email,
      loggedIn: true
    }))
    }

  return (
    <div className="Login">
      <div className="container">
        <h1>Welcome</h1>

        <form className="form" onSubmit={handleSubmit}>
          <input name="email" type="text" placeholder="Email" onChange={event => setEmail(event.target.value)}></input>
          <input name="password" type="password" placeholder="Password" onChange={event => setPassword(event.target.value)}></input>
          <button type="submit" id="login-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default Login;