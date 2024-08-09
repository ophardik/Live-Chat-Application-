// import React from 'react'

// const Message = () => {
//   return (
//     <div className="chat chat-start">
//     <div className="chat-image avatar">
//       <div className="w-10 rounded-full">
//         <img
//           alt="Tailwind CSS chat bubble component"
//           src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
//       </div>
//     </div>
//     <div className="chat-header">
     
//       <time className="text-xs opacity-50">12:45</time>
//     </div>
//     <div className="chat-bubble">You were the Chosen One!</div>
//   </div>
//   )
// }

// export default Message


import React, { useEffect, useRef } from 'react';
import './Message.css';
import { useSelector } from 'react-redux';

const Message = ({ message }) => {
  const scroll = useRef();
  const { authUser, selectedUser } = useSelector(store => store.user);

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div ref={scroll} className={`chat ${authUser?._id === message?.senderId ? 'chat-end' : 'chat-start'}`}>
      <div className="chat-image avatar">
        <div className="w-10 rounded-full">
          <img
            alt="User avatar"
            src={message.senderId === authUser?._id ? authUser?.profilePic : selectedUser?.profilePic}
          />
        </div>
      </div>
      <div className="chat-header">
        <time className="text-xs opacity-50">12:45</time>
      </div>
      <div className="chat-bubble">{message?.message}</div>
    </div>
  );
};

export default Message;


