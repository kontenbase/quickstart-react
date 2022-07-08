import * as React from 'react';
import Login from '../components/Login';
import Register from '../components/Register';
import { kontenbase } from '../lib/kontenbase';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const navigate = useNavigate();
  const [switchAuthForm, setSwitchAuthForm] = React.useState('register');

  React.useEffect(() => {
    (async () => {
      const { error } = await kontenbase.auth.user();

      if (error) {
        console.log(error);
        return;
      }

      navigate('myaccount');
    })();
  }, []);

  const handleRegisterForm = () => {
    setSwitchAuthForm('register');
  };

  const handleLoginForm = () => {
    setSwitchAuthForm('login');
  };

  return (
    <div className="auth-page">
      <div className="auth-button">
        <button onClick={handleRegisterForm}>Register</button>
        <button onClick={handleLoginForm}>Login</button>
      </div>
      {switchAuthForm === 'register' ? <Register /> : <Login />}
    </div>
  );
};

export default Auth;
