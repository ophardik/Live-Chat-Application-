// import React from 'react'
// import { IoSearchSharp } from "react-icons/io5";
// import './Sidebar.css'
// import OtherUsers from './OtherUsers';

// const Sidebar = () => {
//   return (
//     <div className='sidebar'>
//       <form action="">
//         <input className='input'
//          type="text"
//           placeholder='Search...'
//           />
//           <button className='btn'>
//           <IoSearchSharp />
//           </button>
//       </form>
//       <div className='divider'></div>
//       <OtherUsers/>
//       <div className='mt-2'>
//         <button className='btn btn-sm'>Logout</button>
//       </div>
//     </div>
//   )
// }

// export default Sidebar


import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import './Sidebar.css';
import OtherUsers from './OtherUsers';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setAuthUser, setOtherUsers } from '../redux/userSlice';

const Sidebar = () => {
  const [search, setSearch] = useState("");
  const otherUsers = useSelector(store => store.user.otherUsers);
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const searchSubmitHandler = async (e) => {
    e.preventDefault();
    const conversationUser = otherUsers?.find(user => user.fullName.toLowerCase().includes(search.toLowerCase()));
    if (conversationUser) {
      dispatch(setOtherUsers([conversationUser]));
    } else {
      toast.error("User not found");
    }
  };

  const logoutHandler = async () => {
    try {
      const response = await axios.get("http://localhost:8002/api/logout");
      toast.success("Logged out Successfully",response.data.message);
      navigate("/login");
      dispatch(setAuthUser(null))
    } catch (error) {
      console.log("Error in logout component", error);
    }
  };

  return (
    <div className='sidebar'>
      <form onSubmit={searchSubmitHandler}>
        <input
          className='input'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          placeholder='Search...'
        />
        <button type="submit" className='btn'>
          <IoSearchSharp />
        </button>
      </form>
      <div className='divider'></div>
      <OtherUsers />
      <div className='mt-2'>
        <button onClick={logoutHandler} className='btn btn-sm'>Logout</button>
      </div>
    </div>
  );
};

export default Sidebar;

