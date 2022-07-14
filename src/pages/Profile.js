import * as React from 'react';
import { kontenbase } from '../lib/kontenbase';
import { useNavigate, useParams } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();
  const { username } = useParams();
  const [authUsername, setAuthUsername] = React.useState('');
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    (async () => {
      const { user, error } = await kontenbase.auth.user({
        lookup: '*',
      });

      if (error) {
        console.log(error);
        return;
      }

      setAuthUsername(user?.username);
    })();
  }, []);

  React.useEffect(() => {
    (async () => {
      if (!username) {
        return;
      }

      const { data, error } = await kontenbase.service('Users').find({
        where: {
          username,
        },
        lookup: '*',
      });

      if (error) {
        console.log(error);
        return;
      }

      setUser(data?.[0]);
    })();
  }, [username]);

  const handleEditProfile = () => {
    navigate('/profile');
  };

  const handleLogout = async () => {
    const { error } = await kontenbase.auth.logout();

    if (error) {
      console.log(error);
      return;
    }

    navigate('/');
  };

  return (
    <>
      {user && (
        <div className="profile-page">
          {authUsername === username && (
            <div className="button-top">
              <button onClick={handleEditProfile}>Edit Profile</button>
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
          <div className="profile-wrapper">
            <div className="profile-header">
              <img
                className="image-avatar"
                width={90}
                height={90}
                src={
                  user.profile?.[0]?.image ?? 'https://via.placeholder.com/90'
                }
                alt=""
              />
              <h3 className="profile-title">
                <span>{user.firstName}</span> <span>{user.lastName ?? ''}</span>
              </h3>
              <p>{user.profile?.[0]?.position ?? 'position is null'}</p>
            </div>
            <div className="card">
              <h3>Contact</h3>
              <div className="card-field">
                <span>Name</span>
                <p>
                  {user.firstName} {user.lastName ?? ''}
                </p>
              </div>
              <div className="card-field">
                <span>Mobile</span>
                <p>{user.phoneNumber ?? 'phone number is null'}</p>
              </div>
              <div className="card-field">
                <span>Email</span>
                <a className="link-email" href="mailto:name@email.com">
                  {user.email}
                </a>
              </div>
              <div className="card-field">
                <span>Company</span>
                <p>{user.profile?.[0]?.company ?? 'company is null'}</p>
              </div>
            </div>
            <div className="card">
              <h3>Location</h3>
              <p>{user.profile?.[0]?.location ?? 'location is null'}</p>
            </div>
            <div className="card">
              <h3>Web Links</h3>
              <a
                className="website-link"
                href={user.profile?.[0]?.website ?? ''}
              >
                Website
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
