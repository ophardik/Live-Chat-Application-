// import React, { useEffect } from 'react'
// import axios from 'axios'
// import { useDispatch, useSelector } from 'react-redux'
// import { setOtherUsers } from '../redux/userSlice'

// const useGetOtherUsers = () => {
//     const dispatch=useDispatch()
//     useEffect(()=>{
     
//         const fetchOtherUsers=async()=>{
//             try {
//                 axios.defaults.withCredentials=true
//                 const response=await axios.get("http://localhost:8002/api/getOtherUser")
//                 console.log("response after getting other users",response)
//                 dispatch(setOtherUsers(response.data))
//                 console.log("dispatch setOtherUsers",dispatch(setOtherUsers(response.data)))
//             } catch (error) {
//                 console.log("Error in useGetOtherUsers hook",error)
//             }
//         }
//         fetchOtherUsers()
//     },[])
//   return (
//     <div>
      
//     </div>
//   )
// }

// export default useGetOtherUsers



import React, { useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setOtherUsers } from '../redux/userSlice'

const useGetOtherUsers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchOtherUsers = async () => {
            try {
                axios.defaults.withCredentials = true
                const response = await axios.get("http://localhost:8002/api/getOtherUser")
                console.log("response after getting other users", response)
                dispatch(setOtherUsers(response.data))
            } catch (error) {
                console.log("Error in useGetOtherUsers hook", error)
            }
        }
        fetchOtherUsers()
    }, [dispatch])

    return null // Updated to return null as it is not needed in this context
}

export default useGetOtherUsers
