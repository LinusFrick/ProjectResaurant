import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function RegisterForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [roles, setRoles] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    
    const handleSubmit = (e) => {
        e.preventDefault();

        axios.post('http://localhost:8080/api/auth/signup', {
            username, email, password, roles
        },
            {
                headers: { 'Content-Type': 'application/json' }
            })
            .then(response => {
                if (response.status === 200) {
                    setError(null);
                    console.log('Registration success')
                    navigate('/user')
                } else {
                    throw new Error('Registration failed');
                }
            })
            .catch(error => {
                setError(error.response.data.message);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input
                    type='text'
                    value={username}
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    required
                />
            </label>
            <br />
            <label>
                Email:
                <input
                    type='text'
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                    }}
                    required
                />
            </label>
            <br />
            <label>
                Password:
                <input
                    type='password'
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    required />
            </label>
            <br />
            {error && <p>{error}</p>}
            <button type="submit">Submit</button>

        </form>
    )
}

export default RegisterForm;
