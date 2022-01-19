import './Login.css';
import {useState} from 'react';

function Login() {
  // const history = useHistory();
  const [email, setEmail] = useState("Name");
  const [password, setPassword] = useState("Password");

  async function handleSubmit(event) {
      event.preventDefault();
      await fetch( 'http://localhost:4000/login', {
          method: 'post',  
          mode:'cors',
          headers : { 
              'Access-Control-Allow-Credentials':'true',
              'Content-Type': 'application/json',
              'Accept': 'application/json'
          },
          body: JSON.stringify({
              "username": email,
              "password": password
          }),
      })
          .then(res => console.log(res));
          // .then((res) => {
          //     if(res.error){
          //         alert(res.error)
          //     }
          //     console.log(res);
          //     // setWithExpiry(res);
          //     // history.push("/");
          //     // setTimeout(() => {
          //     //     window.location.reload();    
          //     //   }, 500);
          // })
  }

  return (
    <div className="Login">
      	<div className="container">
		      <h1>Welcome</h1>
		
          <form className="form" onSubmit={handleSubmit}>
            <input name="email" type="text" placeholder="Email"  onChange={event => setEmail(event.target.value)}></input>
            <input name="password" type="password" placeholder="Password"  onChange={event => setPassword(event.target.value)}></input>
            <button type="submit" id="login-button">Login</button>
          </form>
	      </div>
    </div>
  );
}

export default Login;
