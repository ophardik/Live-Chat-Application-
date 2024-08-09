// import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setSelectedUser } from '../redux/userSlice';
// import './OtherUser.css';

// const OtherUser = ({ user }) => {
//   const dispatch = useDispatch();
//   const { selectedUser, onlineUsers } = useSelector(store => store.user);
//   console.log("onlineUsers are:",onlineUsers)
//   const isOnline = onlineUsers.includes(user._id);
//   console.log("user currently online",isOnline)
//   const selectedUserHandler = () => {
//     dispatch(setSelectedUser(user));
//   };

//   return (
//     <div onClick={selectedUserHandler} className={`user ${selectedUser?._id === user?._id ? 'selected' : ''}`}>
//       <img src={user.profilePic} alt={user.fullName} />
//       <div className="user-info">
//         <div className="user-name">{user.fullName}</div>
//         <div className={`avatar ${isOnline ? 'online' : 'offline'}`}></div>
//       </div>
//     </div>
//   );
// };

// export default OtherUser;
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedUser } from '../redux/userSlice';
import './OtherUser.css'; // Ensure to import the CSS file

const OtherUser = ({ user }) => {
  const dispatch = useDispatch();
  const { selectedUser, onlineUsers } = useSelector(store => store.user);

  // Log the user ID and onlineUsers for debugging
  console.log('User ID:', user._id);
  console.log('Online Users:', onlineUsers);

  const isOnline = onlineUsers.includes(user._id);
  console.log('Is Online:', isOnline);

  const selectedUserHandler = () => {
    console.log("Selected User:", user);
    dispatch(setSelectedUser(user));
  };

  return (
    <div onClick={selectedUserHandler} className={`user ${selectedUser?._id === user?._id ? 'selected' : ''}`}>
      <img src={user.profilePic} alt={user.fullName} />
      <div className="user-info">
        <div className="user-name">{user.fullName}</div>
        <div className={`avatar ${isOnline ? 'online' : 'offline'}`}></div>
      </div>
    </div>
  );
};

export default OtherUser;
