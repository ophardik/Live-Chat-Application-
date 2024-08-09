// import React, { createContext, useContext, useEffect, useState } from 'react';
// import { io } from 'socket.io-client';
// import { useSelector } from 'react-redux';

// const SocketContext = createContext(null);

// export const SocketProvider = ({ children }) => {
//   const authUser = useSelector((state) => state.user.authUser); // Use the correct path to access authUser
//   const [socket, setSocket] = useState(null);

//   useEffect(() => {
//     if (authUser) {
//       const newSocket = io('http://localhost:8005', {
//         query: { userId: authUser._id },
//       });
//       setSocket(newSocket);

//       newSocket.on('connect', () => {
//         console.log('Connected to server');
//       });

//       newSocket.on('disconnect', () => {
//         console.log('Disconnected from server');
//       });

//       return () => {
//         newSocket.disconnect();
//       };
//     }
//   }, [authUser]);

//   return (
//     <SocketContext.Provider value={socket}>
//       {children}
//     </SocketContext.Provider>
//   );
// };

// export const useSocket = () => useContext(SocketContext);


import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { useSelector, useDispatch } from 'react-redux';
import { setOnlineUsers } from '../redux/userSlice';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const authUser = useSelector((state) => state.user.authUser); 
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (authUser) {
      const newSocket = io('http://localhost:8005', {
        query: { userId: authUser._id },
      });
      setSocket(newSocket);

      newSocket.on('connect', () => {
        console.log('Connected to server');
      });

      newSocket.on('disconnect', () => {
        console.log('Disconnected from server');
      });

      newSocket.on('getOnlineUsers', (onlineUsers) => {
        console.log('Received online users:', onlineUsers); // Debug log
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        newSocket.disconnect();
      };
    }
  }, [authUser, dispatch]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
