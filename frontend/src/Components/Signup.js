import React, { useState } from 'react';
import './Signup.css';
import { Link,useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast'

const Signup = () => {
  const [user, setUser] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "male"
  });
   const navigate=useNavigate()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleGenderChange = (gender) => {
    setUser(prevState => ({
      ...prevState,
      gender: gender
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await axios.post("http://localhost:8002/api/signup", user, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true
      });
      console.log("Response is ", res);
      if(res.data.success){
        navigate("/login")
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message)
      console.log("Error in signup component", error);
    }

    setUser({
      fullName: "",
      username: "",
      password: "",
      confirmPassword: "",
      gender: "male"
    });
  };

  return (
    <div className='signup-container'>
      <h1 className='signup-title'>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='signup-label'>
            <span>Full Name</span>
            <input
              className='signup-input'
              type='text'
              name='fullName'
              placeholder='Hardik'
              value={user.fullName}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='signup-label'>
            <span>Username</span>
            <input
              className='signup-input'
              type='text'
              name='username'
              placeholder='Username'
              value={user.username}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='signup-label'>
            <span>Password</span>
            <input
              className='signup-input'
              type='password'
              name='password'
              placeholder='Password'
              value={user.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='mb-4'>
          <label className='signup-label'>
            <span>Confirm Password</span>
            <input
              className='signup-input'
              type='password'
              name='confirmPassword'
              placeholder='Confirm Password'
              value={user.confirmPassword}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className='signup-radio-group'>
          <label className='signup-radio'>
            <input
              type="radio"
              name="gender"
              value="male"
              checked={user.gender === "male"}
              onChange={() => handleGenderChange("male")}
              className="radio-input"
            />
            <span>Male</span>
          </label>
          <label className='signup-radio'>
            <input
              type="radio"
              name="gender"
              value="female"
              checked={user.gender === "female"}
              onChange={() => handleGenderChange("female")}
              className="radio-input"
            />
            <span>Female</span>
          </label>
          <Link to='/login' className='signup-link'>
            Already have an account
          </Link>
        </div>
        <div>
          <button type='submit' className='signup-button'>Signup</button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
