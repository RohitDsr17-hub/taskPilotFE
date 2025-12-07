import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';


const Login = () => {

  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      }, { withCredentials: true });
      console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/")
    } catch (err) {
      setError(err?.response?.data?.error)
      console.log(err);
    }
  }

  const handleSignup = async () => {
    try {
      const res = await axios.post(BASE_URL + "/signup", {
        firstName, 
        lastName,
        emailId,
        password,
      }, { withCredentials: true });
      console.log(res.data);
      dispatch(addUser(res.data.data));
      return navigate("/profile")
    } catch (err) {
      setError(err?.response?.data?.error)
      console.log(err);
    }
  }

  return (
    <div className="flex justify-center py-10">
      <div className="card bg-base-300 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title justify-center">{isLoginForm ? "login" : "Sign Up"}</h2>
          <div>
            {!isLoginForm && (
              <>
              <fieldset className="fieldset">
              <legend className="fieldset-legend">First Name</legend>
              <input type="text" className="input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Last Name</legend>
              <input type="text" className="input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </fieldset>
            </>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email Id : {emailId}</legend>
              <input type="text" className="input" value={emailId} onChange={(e) => setEmailId(e.target.value)} />
            </fieldset>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input type="password" className="input" value={password} onChange={(e) => setPassword(e.target.value)} />
            </fieldset>
          </div>
          <p className="text-red-500">{error}</p>
          <div className="card-actions justify-center">
            <button className="btn btn-primary" onClick={isLoginForm ? handleLogin : handleSignup}>{isLoginForm ? "Login" : "Sign Up"}</button>
          </div>
          <p className="m-auto cursor-pointer py-2" onClick={() => setIsLoginForm((value) => !value)}>{isLoginForm ? "New User? Signup here" : "Existing user? Login Here"}</p>
        </div>
      </div>
    </div>
  )
}

export default Login