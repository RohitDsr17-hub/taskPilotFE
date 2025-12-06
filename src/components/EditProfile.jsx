import React, { useState } from 'react';
import UserCard from './UserCard';
import { BASE_URL } from '../utils/constants';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { addUser } from '../utils/userSlice';

const EditProfile = ({ user }) => {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState(user.firstName || "");
  const [lastName, setLastName] = useState(user.lastName || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const saveProfile = async () => {
    setError("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, photoUrl },
        { withCredentials: true }
      );

      dispatch(addUser(res.data.data));

      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);

    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <>
      <div className="flex justify-center my-10">
        <div className="flex justify-center mx-10">
          <div className="card bg-base-300 w-96 shadow-sm">
            <div className="card-body">
              <h2 className="card-title justify-center">Edit Profile</h2>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">First Name</legend>
                <input className="input" value={firstName} onChange={e => setFirstName(e.target.value)} />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Last Name</legend>
                <input className="input" value={lastName} onChange={e => setLastName(e.target.value)} />
              </fieldset>

              <fieldset className="fieldset">
                <legend className="fieldset-legend">Photo URL</legend>
                <input className="input" value={photoUrl} onChange={e => setPhotoUrl(e.target.value)} />
              </fieldset>
              <p className="text-red-500">{error}</p>

              <div className="card-actions justify-center">
                <button className="btn btn-primary" onClick={saveProfile}>
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <UserCard user={{ firstName, lastName, photoUrl }} />
      </div>

      {showToast && (
        <div className="toast toast-top toast-center">
          <div className="alert alert-success">
            <span>Profile saved successfully.</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
