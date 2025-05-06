import { useState } from 'react';
import axios from 'axios';

function Login({ onLogin}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const endpoint = isRegister ? '/auth/register' : '/auth/login';

            try {
              const res = await axios.post(
                `${
                  import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL
                }${endpoint}`,
                {
                  email,
                  password,
                }
              );


              localStorage.setItem('token', res.data.token);
              onLogin(); // tells App we're logged in
            } catch (err) {
              setError('Auth failed. Check credentials or try again.');
            }
    };

      return (
    <div className="container">
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegister ? 'Register' : 'Login'}</button>
        <p onClick={() => setIsRegister(!isRegister)} style={{ cursor: 'pointer' }}>
          {isRegister ? 'Already have an account? Login' : 'No account? Register'}
        </p>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}

export default Login;