import React, { useEffect, useState } from 'react';
import Axios from '@/Axios';

const OnlineUser = ({userId}) => {

  const [user, setUser] = useState();

  useEffect(() => {
    if(userId) getUser(userId)
  }, [])
  
  const getUser = async (userid) => {
    const res = await Axios.get(`users/${userid}`)

    setUser(res.data.user)
  }


  return (
    <div className='p-2 flex flex-col rounded-full mx-1 justify-center items-center w-[5rem] h-[5rem]'>
        <div className=' w-[3rem] h-[3rem] p-1 rounded-full relative shadow-md'>
          <img className='w-full h-full rounded-full' src={user?.image ? user.image : "/images/profile.png"} alt="profile"/>
          <div className='w-4 h-4 absolute rounded-full bg-green-500 right-1 bottom-0'></div>
        </div>
        <h3 className='text-sm whitespace-nowrap text-ellipsis overflow-hidden font-semibold font-sans'>{user?.name}</h3>
    </div>
  )
}

export default OnlineUser;
