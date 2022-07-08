import React, { useEffect, useState } from 'react';
import { kontenbase } from '../lib/kontenbase';
import { useNavigate } from 'react-router-dom';

const EditAccount = () => {
  const [profileId, setProfileId] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setphoneNumber] = useState('');
  const [company, setCompany] = useState('');
  const [position, setPosition] = useState('');
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [website, setWebsite] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const { user, error } = await kontenbase.auth.user({
      lookup: '*',
    });
    const profile = user.profile[0];
    setProfileId(profile?._id);
    setFirstName(user?.firstName);
    setLastName(user?.lastName);
    setphoneNumber(user?.phoneNumber);
    setImage(profile?.image);
    setCompany(profile?.company);
    setLocation(profile?.location);
    setPosition(profile?.position);
    setWebsite(profile?.website);
  };

  const handleLogout = async () => {
    const response = await kontenbase.auth.logout();
    if (response.status === 200) {
      navigate('/');
    }
  };

  const handleChangeImage = async (e) => {
    setLoading(true);
    const file = e.target.files[0];
    const { data, error } = await kontenbase.storage.upload(file);

    if (error) {
      alert(error.message);
    } else {
      const response = await kontenbase
        .service('profile')
        .updateById(profileId, {
          image: data.url,
        });
      setImage(response?.data?.image);
    }
    setLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const { status, error } = await kontenbase.auth.update({
      lastName,
      firstName,
      phoneNumber,
    });

    const { status: profileStatus } = await kontenbase
      .service('profile')
      .updateById(profileId, {
        company,
        location,
        position,
        website,
      });

    if (status === 200 || profileStatus === 200) {
      alert('Update success');
      navigate('/myaccount');
    } else {
      alert(error.message);
    }
  };

  return (
    <div className="profile-page">
      <div className="button-top">
        <button className="button-back" onClick={() => navigate('/myaccount')}>
          Back
        </button>
        <button onClick={() => handleLogout()}>Logout</button>
      </div>
      <div className="profile-wrapper">
        <div className="profile-header">
          <img
            className="image-avatar"
            width={90}
            height={90}
            src={image ? image : 'https://via.placeholder.com/90'}
            alt=""
          />
          <div>
            <label className="label-file" htmlFor="file">
              {loading ? 'Loading...' : 'Change Image'}
            </label>
            <input
              onChange={(e) => handleChangeImage(e)}
              id="file"
              type="file"
            />
          </div>
        </div>
        <div className="card">
          <form onSubmit={handleUpdate}>
            <div className="card-field">
              <label>First Name</label>
              <input
                value={firstName || ''}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="card-field">
              <label>Last Name</label>
              <input
                value={lastName || ''}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="card-field">
              <label>Phone Number</label>
              <input
                value={phoneNumber || ''}
                onChange={(e) => setphoneNumber(e.target.value)}
              />
            </div>
            <div className="card-field">
              <label>Company</label>
              <input
                value={company || ''}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <div className="card-field">
              <label>Position</label>
              <input
                value={position || ''}
                onChange={(e) => setPosition(e.target.value)}
              />
            </div>
            <div className="card-field">
              <label>Location</label>
              <input
                value={location || ''}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="card-field">
              <label>Website</label>
              <input
                type="url"
                value={website || ''}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="form-button">
              <button type="submit" className="button button-primary">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAccount;
