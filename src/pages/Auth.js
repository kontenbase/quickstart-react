import React, { useState, useEffect } from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { kontenbase } from '../lib/kontenbase';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [switchAuthForm, setSwitchAuthForm] = useState('register');
  const [user, setUser] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    getUser();
    if (user) {
      navigate('myaccount');
    }
  }, [user]);

  const getUser = async () => {
    const response = await kontenbase.auth.user();
    setUser(response?.user);
  };

  return (
    <div className="auth-page">
      <div className="auth-button">
        <button onClick={() => setSwitchAuthForm('register')}>Register</button>
        <button onClick={() => setSwitchAuthForm('login')}>Login</button>
      </div>

      {switchAuthForm === 'register' ? (
        <Register />
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
};

export default Auth;
