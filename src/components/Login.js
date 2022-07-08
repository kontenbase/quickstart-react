import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { kontenbase } from '../lib/kontenbase';
const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await kontenbase.auth.login({
      username,
      password,
    });

    if (response.status === 200) {
      setUser(response.user);
      navigate('/myaccount');
    } else {
      alert(response.error?.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleLogin}>
        <h2>Login</h2>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-button">
          <button className="button button-primary" type="sumbit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
