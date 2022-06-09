import React from 'react'
import { useNavigate } from 'react-router-dom'

import './Home.css'

const Home = () => {

    const user = JSON.parse(localStorage.getItem('userInfo'));
   
    const navigate = useNavigate()

    const handleLogOut =()=>{
          localStorage.removeItem('userInfo')
          navigate('/')
    }
    
  return (
    <div className='homePage'>
       <h1 >Welcome {user?user.name:'User'}</h1>
       <button onClick={handleLogOut}>LogOut</button>
    </div>
    
  )
}

export default Home