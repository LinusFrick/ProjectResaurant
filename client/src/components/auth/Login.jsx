import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/auth/signin', { username, password }, { headers: { 'Content-Type': 'application/json' } })
      .then(response => {
        console.log('Response:', response);
        if(response.status === 200){
            return response.data;
        } else{
            throw new Error('Login failed');
        }
      })
        .then(data => {
            localStorage.setItem('token', data.accessToken);
            localStorage.setItem('user', JSON.stringify(data));
  
            if (data.roles.includes('ROLE_ADMIN')) {
                navigate('/admin');
            } else {
                navigate('/user');
            }
        })
        .catch(error => {
        setError(error.message);
  });

  };


  return (
    <form action="/api/auth/signin" onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          required
        />
      </label>
      <br />
      <label>
        Password:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <br />
      {error && <div>{error}</div>}
      <button type="submit">Sign in</button>
      <Link to="/register" >
        <button>Register</button>
      </Link>
    </form>
  );
}

export default LoginForm;