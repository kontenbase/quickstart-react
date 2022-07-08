import React, { useEffect, useRef, useState } from 'react';
import { kontenbase } from '../lib/kontenbase';
import { useNavigate } from 'react-router-dom';

const Account = () => {
  const [user, setUser] = useState();
  const [shareProfile, setShareProfile] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const response = await kontenbase.auth.user({
      lookup: '*', //this will show all linked data with user
    });
    setUser(response?.user);
    setShareProfile('http://localhost:3000/profile/' + response.user?.username);
  };

  const handleLogout = async () => {
    const response = await kontenbase.auth.logout();
    if (response.status === 200) {
      navigate('/');
    }
  };

  const handleShareProfile = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(shareProfile);
    alert('Link Copied!');
  };

  if (!user) {
    return (
      <div className="not-autheticated">
        <p>Your Are not autheticated!</p>
        <button onClick={() => navigate('/')} className="button button-primary">
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="button-top">
        <button onClick={() => navigate('/edit-account')}>Edit Profile</button>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
      <div className="profile-wrapper">
        <div className="profile-header">
          <img
            className="image-avatar"
            width={90}
            height={90}
            src={
              user?.profile[0]?.image
                ? user?.profile[0]?.image
                : 'https://via.placeholder.com/90'
            }
            alt=""
          />
          <h3 className="profile-title">
            <span>{user?.firstName}</span>
            {user?.lastName ? <span> {user?.lastName}</span> : ''}
          </h3>
          <p>
            {user?.profile[0]?.position ? user?.profile[0]?.position : 'null'}
          </p>
        </div>
        <div className="card">
          <div className="share-contact">
            <button
              className="button-share"
              onClick={(e) => handleShareProfile(e)}
            >
              Share
            </button>
          </div>
          <h3>Contact</h3>
          <div className="card-field">
            <span>Name</span>
            <p>
              {user?.firstName}
              {user?.lastName ? ' ' + user?.lastName : ''}
            </p>
          </div>
          <div className="card-field">
            <span>Mobile</span>
            <p>{user?.phoneNumber ? user?.phoneNumber : 'null'}</p>
          </div>
          <div className="card-field">
            <span>Email</span>
            <a className="link-email" href="mailto:name@email.com">
              {' '}
              {user?.email}
            </a>
          </div>
          <div className="card-field">
            <span>Company</span>
            <p>
              {user?.profile[0]?.company ? user?.profile[0]?.company : 'null'}
            </p>
          </div>
        </div>
        <div className="card">
          <h3>Location</h3>
          <p>{user?.profile[0]?.location}</p>
        </div>
        <div className="card">
          <h3>Web Links</h3>
          <a
            className="website-link"
            href={
              user?.profile[0]?.website ? user?.profile[0]?.website : 'null'
            }
          >
            Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default Account;
