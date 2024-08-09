// import React, { useEffect } from 'react'
// import OtherUser from './OtherUser'
// import './OtherUsers.css'
// import useGetOtherUsers from '../Hooks/useGetOtherUsers'
// import { useSelector } from 'react-redux'

// const OtherUsers = () => {
//   useGetOtherUsers()
//   const { OtherUsers } = useSelector(store => store.user)

//   // Debugging: Check the length of OtherUsers
//   useEffect(() => {
//     console.log("OtherUsers length:", OtherUsers?.length)
//   }, [OtherUsers])

//   if (!OtherUsers || OtherUsers.length === 0) {
//     return <p>No users found.</p>
//   }

//   return (
//     <div className='overflow-auto'>
//       {OtherUsers.map(user => (
//         <OtherUser key={user._id} user={user} />
//       ))}
//     </div>
//   )
// }

// export default OtherUsers


import React, { useEffect } from 'react'
import OtherUser from './OtherUser'
import './OtherUsers.css'
import useGetOtherUsers from '../Hooks/useGetOtherUsers'
import { useSelector } from 'react-redux'

const OtherUsers = () => {
  useGetOtherUsers()
  const otherUsers = useSelector(state => state.user.otherUsers) // Match property name

  useEffect(() => {
    //console.log("otherUsers length:", otherUsers.length)
  }, [otherUsers])

  if (!otherUsers || otherUsers.length === 0) {
    return <p>No users found.</p>
  }

  return (
    <div className='overflow-auto'>
      {otherUsers.map(user => (
        <OtherUser key={user._id} user={user} />
      ))}
    </div>
  )
}

export default OtherUsers

