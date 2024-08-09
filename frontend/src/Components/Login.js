import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import './Login.css';
import { useDispatch } from 'react-redux';
import { setAuthUser } from '../redux/userSlice';

const Login = () => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const dispatch=useDispatch()
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
   

    try {
      const res = await axios.post("http://localhost:8002/api/login", user, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });

      console.log("Response is ", res);
      dispatch(setAuthUser(res.data))
      console.log(      dispatch(setAuthUser(res.data))
    )
        navigate("/home");
        toast.success("Login successful");
      
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred");
      console.log("Error in login component", error);
    } 
    

    setUser({
      username: "",
      password: "",
    });
  };

  return (
    <div className='login-container'>
      <h1 className='login-title'>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='login-label'>
            <span className='text-base'>Username</span>
            <input
              className='login-input'
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              type='text'
              placeholder='Username'
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='login-label'>
            <span className='text-base'>Password</span>
            <input
              className='login-input'
              type='password'
              placeholder='Password'
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </label>
        </div>
        <Link className='login-link' to="/">
          Do not have an account?
        </Link>
        <div>
          <button type="submit" className='login-button' disabled="">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
