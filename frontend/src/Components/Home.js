import React from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import './Home.css'
const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg opacity-0'>
      <Sidebar/>
      <MessageContainer/>
    </div>
  )
}

export default Home
