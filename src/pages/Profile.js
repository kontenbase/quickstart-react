import React, { useEffect, useState } from 'react';
import { kontenbase } from '../lib/kontenbase';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState();
  const [profile, setProfile] = useState();
  const params = useParams();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { username } = params;
    const { data: user } = await kontenbase.service('Users').find({
      where: {
        username,
      },
      lookup: '*',
    });
    setUser(user[0]);
    setProfile(user[0].profile[0]);
  };

  return (
    <div className="profile-page">
      <div className="profile-wrapper">
        <div className="profile-header">
          <img
            width={90}
            height={90}
            className="image-avatar"
            src={
              profile?.image ? profile?.image : 'https://via.placeholder.com/90'
            }
            alt=""
          />
          <h3 className="profile-title">
            <span>{user?.firstName}</span>
            {user?.lastName ? <span> {user?.lastName}</span> : ''}
          </h3>
          <p>{profile?.position ? profile.position : 'null'}</p>
        </div>
        <div className="card">
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
              {user?.email}
            </a>
          </div>
          <div className="card-field">
            <span>Company</span>
            <p>{profile?.company ? profile?.company : 'null'}</p>
          </div>
        </div>
        <div className="card">
          <h3>Location</h3>
          <p>{profile?.location}</p>
        </div>
        <div className="card">
          <h3>Web Link</h3>
          {profile?.website ? (
            <a className="website-link" href={profile?.website}>
              {profile?.website}
            </a>
          ) : (
            'null'
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
