// // import './App.css';
// // import './index.css';
// // import { BrowserRouter, Routes, Route } from 'react-router-dom';
// // import Signup from './Components/Signup';
// // import Login from './Components/Login';
// // import Home from './Components/Home';
// // import { useDispatch, useSelector } from 'react-redux';
// // import { useEffect, useState } from 'react';
// // import { io } from "socket.io-client";
// // import { setSocket } from './redux/socketSlice';
// // import { setOnlineUsers } from './redux/userSlice';

// // function App() {
// //   const { authUser } = useSelector(store => store.user);
// //   const dispatch=useDispatch()

// //   useEffect(() => {
// //     if (authUser) {
// //       const socket = io('http://localhost:8005', {
// //         query:{
// //           userId:authUser._id
// //         }
// //         // transports: ['websocket'],
// //         // withCredentials: true
// //       });
// //      dispatch(setSocket(socket)) 
// //      socket.on('getOnlineUsers',(onlineUsers)=>{
// //       dispatch(setOnlineUsers(onlineUsers))
// //       console.log(dispatch(setOnlineUsers(onlineUsers)))
// //      })

// //       // Handle socket events if needed
// //       socket.on('connect', () => {
// //         console.log('Connected to server');
// //       });

// //       return () => {
// //         socket.disconnect();
// //       };
// //     }
// //   }, [authUser]);

// //   return (
// //     <BrowserRouter>  
// //       <div className='p-4 h-screen flex items-center justify-center'>
// //         <img src="/bg4.jpeg" alt="Background" className="background-image" />
// //         <Routes>
// //           <Route path="/" element={<Signup />} />
// //           <Route path="/login" element={<Login />} />
// //           <Route path="/home" element={<Home />} />
// //         </Routes>
// //       </div>
// //     </BrowserRouter>
// //   );
// // }

// // export default App;


// import './App.css';
// import './index.css';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Signup from './Components/Signup';
// import Login from './Components/Login';
// import Home from './Components/Home';
// import { useDispatch, useSelector } from 'react-redux';
// import { useEffect } from 'react';
// import { setOnlineUsers } from './redux/userSlice';
// import { SocketProvider, useSocket } from './Contexts/SocketContext';

// function App() {
//   const { authUser } = useSelector(store => store.user);
//   const dispatch = useDispatch();
//   const socket = useSocket();

//   useEffect(() => {
//     if (authUser && socket) {
//       socket.on('getOnlineUsers', (onlineUsers) => {
//         dispatch(setOnlineUsers(onlineUsers));
//       });
//     }
//   }, [authUser, socket, dispatch]);

//   return (
//     <SocketProvider authUser={authUser}>
//       <BrowserRouter>
//         <div className='p-4 h-screen flex items-center justify-center'>
//           <img src="/bg4.jpeg" alt="Background" className="background-image" />
//           <Routes>
//             <Route path="/" element={<Signup />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/home" element={<Home />} />
//           </Routes>
//         </div>
//       </BrowserRouter>
//     </SocketProvider>
//   );
// }

// export default App;

import './App.css';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Home from './Components/Home';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setOnlineUsers } from './redux/userSlice';
import { SocketProvider, useSocket } from './Contexts/SocketContext';

function App() {
  const { authUser } = useSelector(store => store.user);
  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    if (authUser && socket) {
      socket.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });
    }
  }, [authUser, socket, dispatch]);

  return (
    <SocketProvider authUser={authUser}>
      <BrowserRouter>
        <div className='p-4 h-screen flex items-center justify-center'>
          <img src="/bg4.jpeg" alt="Background" className="background-image" />
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </div>
      </BrowserRouter>
    </SocketProvider>
  );
}

export default App;
