// // import { useEffect } from "react"
// // import { useDispatch, useSelector } from "react-redux"
// // import { setMessages } from "../redux/messageSlice"

// // const useGetRealTimeMessage= async()=>{
// //     console.log("useGetRealTimeMessage gets hitttt")
// //     const{socket}=useSelector(store=>store.socket)
// //     console.log("socket",socket)

// //     const{messages}=useSelector(store=>store.message)
// //     console.log("messages",messages)

// //     const dispatch=useDispatch()
// //    useEffect(()=>{
// //      socket?.on("newMessage",(newMessage)=>{
// //         console.log("newMessageeeeeeee",newMessage)

// //      dispatch(setMessages([...messages,newMessage]))
// //      })
// //    },[socket,setMessages,messages])
// // }
// // export default useGetRealTimeMessage

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setMessages } from "../redux/messageSlice";
// import { useSocket } from '../Contexts/SocketContext';

// const useGetRealTimeMessage = () => {
//   const socket = useSocket();
//   const { messages } = useSelector(store => store.message);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (socket) {
//       socket.on("newMessage", (newMessage) => {
//         dispatch(setMessages([...messages, newMessage]));
//       });
//     }
//   }, [socket, messages, dispatch]);
// };

// export default useGetRealTimeMessage;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../redux/messageSlice";
import { useSocket } from '../Contexts/SocketContext';

const useGetRealTimeMessage = () => {
  const socket = useSocket();
  const { messages } = useSelector(store => store.message);
  const { authUser } = useSelector(store => store.user); // Ensure authUser is available
  const dispatch = useDispatch();
  console.log("authUser",authUser)

  useEffect(() => {
    if (socket && authUser) {
      socket.on("newMessage", (newMessage) => {
        // Only add the message if it's intended for the current user
        if (newMessage.receiverId === authUser._id) {
          dispatch(setMessages([...messages, newMessage]));
        }
      });
    }
  }, [socket, messages, authUser, dispatch]);
};

export default useGetRealTimeMessage;
