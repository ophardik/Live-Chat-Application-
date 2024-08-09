// // import axios from 'axios'
// // import React, { useEffect } from 'react'
// // import { useSelector } from 'react-redux'

// // const useGetMessages = () => {
// //     const {selectedUser}=useSelector(store=>store.user)
// //     useEffect(() => {
// //         const fetchMessages = async () => {
// //             try {
// //                 axios.defaults.withCredentials = true
// //                 const response = await axios.get(`http://localhost:8002/message/getMessage/${selectedUser?._id}`)
// //                 console.log("Response of getting message is",response)
// //             } catch (error) {
// //                 console.log("Error in getting messages", error)
// //             }
// //         }
// //         fetchMessages()
// //     }, [])
// //     return (
// //         <div>

// //         </div>
// //     )
// // }

// // export default useGetMessages

// import axios from 'axios'
// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setMessages } from '../redux/messageSlice'

// const useGetMessages = () => {
//     const { selectedUser } = useSelector(store => store.user)
//     const dispatch=useDispatch()
//     console.log("Selected User:", selectedUser) // Debugging line

//     useEffect(() => {
//         if (!selectedUser?._id) return // Return early if no selectedUser or _id

//         const fetchMessages = async () => {
//             try {
//                 axios.defaults.withCredentials = true
//                 const response = await axios.get(`http://localhost:8002/message/getMessage/${selectedUser._id}`)
//                 console.log("Response of getting message is", response.data) // Log response data
//                 dispatch(setMessages(response.data))
//                 console.log("nfsdongdng",dispatch(setMessages(response.data))
//             )
//             } catch (error) {
//                 console.error("Error in getting messages:", error.response ? error.response.data : error.message) // Improved error handling
//             }
//         }
//         fetchMessages()
//     }, [selectedUser]) // Added dependency

//     return null // No UI rendered by this hook
// }

// export default useGetMessages


import axios from 'axios';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';

const useGetMessages = () => {
    const { selectedUser } = useSelector(store => store.user);
    const dispatch = useDispatch();
    console.log("Selected User:", selectedUser); // Debugging line

    useEffect(() => {
        if (!selectedUser?._id) return; // Return early if no selectedUser or _id

        const fetchMessages = async () => {
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(`http://localhost:8002/message/getMessage/${selectedUser._id}`);
                console.log("Response of getting message is", response.data); // Log response data
                dispatch(setMessages(response.data));
            } catch (error) {
                console.error("Error in getting messages:", error.response ? error.response.data : error.message); // Improved error handling
            }
        };

        fetchMessages();
    }, [selectedUser, dispatch]); // Added dependency on dispatch

    return null; // No UI rendered by this hook
};

export default useGetMessages;
