// import React from 'react'
// import { IoMdSend } from "react-icons/io";

// const SendInput = () => {
//   return (
//     <form className='px-4 my-3'>
//       <div className='w-full relative'>
//         <input type='text'
//         placeholder='send a message...'
//         className='border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white'
//         />
//         <button className='absolute flex inset-y-0 end-0 items-center pr-4'>
//         <IoMdSend />
//         </button>
//       </div>
//     </form>
//   )
// }

// export default SendInput




import React, { useState } from 'react';
import { IoMdSend } from "react-icons/io";
import './SendInput.css';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { setMessages } from '../redux/messageSlice';

const SendInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { selectedUser } = useSelector(store => store.user);
  const { messages } = useSelector(store => store.message);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!selectedUser?._id) {
      console.log("No user selected");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:8002/message/sendMessage/${selectedUser._id}`,
        { message },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );
     // console.log("Response after sending message", response);
      dispatch(setMessages([...messages, response?.data?.newMessage]));
    } catch (error) {
      console.log("Error in SendInput component", error);
    }
    setMessage("");
  };

  return (
    <form onSubmit={onSubmitHandler} className='send-input-form'>
      <div className='input-container'>
        <input
          type='text'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder='Send a message...'
          className='input-field'
        />
        <button type="submit" className='send-button'>
          <IoMdSend />
        </button>
      </div>
    </form>
  );
};

export default SendInput;
