// import React from 'react'
// import SendInput from './SendInput'
// import Messages from './Messages'
// import './MessageContainer.css'
// const MessageContainer = () => {
//   return (
//     <div className='md:min:w-[550px] flex-flex-col'>
//      <div className='flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2'>
//          <div className='w-10 rounded-full'>
//              <img src='https://th.bing.com/th/id/OIP.K-4RqDC6zFrpAG31ayDDOgAAAA?w=213&h=213&c=7&r=0&o=5&dpr=1.4&pid=1.7' alt=""></img>
//          </div>
//      </div>
//      <div className='flex flex-col flex-1'>
//          <div className='flex justify-between items-center gap-2 flex-1'>
//              <p>Hardik Khandelwal</p>
//          </div>
//      </div>
//      <Messages/>
//      <SendInput/>
//      </div> 
//   )
// }

// export default MessageContainer



import React from 'react';
import SendInput from './SendInput';
import Messages from './Messages';
import './MessageContainer.css';
import { useSelector } from 'react-redux';

const MessageContainer = () => {
  const {selectedUser}=useSelector(store=>store.user)
  return (
    <div className='message-container'>
      <div className='header'>
        <div className='avatar'>
          <img src={selectedUser?.profilePic} alt="Avatar"></img>
        </div>
        <div className='user-info'>
          <div className='username'>
            <p>{selectedUser?.fullName}</p>
          </div>
        </div>
      </div>
      <Messages/>
      <SendInput/>
    </div>
  );
}

export default MessageContainer;

