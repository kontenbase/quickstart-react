import React from 'react';
import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Auth from './pages/Auth';
import EditAccount from './pages/EditAccount';
import Account from './pages/Account';
import Profile from './pages/Profile';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/myaccount" element={<Account />} />
        <Route path="/edit-account" element={<EditAccount />} />
        <Route path="/profile/:username" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
