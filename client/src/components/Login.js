import './Login.css';
import { useState } from 'react';

function Login() {
  const [email, setEmail] = useState("Email");
  const [password, setPassword] = useState("Password");

  async function handleSubmit(event) {
    event.preventDefault();
    await fetch('http://localhost:4000/login', {
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
      .then(res => res.json())
      .then(console.log);
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