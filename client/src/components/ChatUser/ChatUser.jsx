import Axios from '@/Axios';
import React, { useEffect, useState } from 'react'

const ChatUser = ({members, currentUser}) => {

  const [friend, setFriend] = useState();

  useEffect(() => {
    if(members){
      const friendId = members.find(i => i !== currentUser._id)
      getFriends(friendId)
    }    
  }, [])

  const getFriends = async (userId) => {
    const res = await Axios.get(`users/${userId}`)

    setFriend(res.data.user)
  }

  return (
      <div className='p-4 px-3 flex items-center rounded-lg shadow-md cursor-pointer hover:bg-[#f5f5f5] bg-[#fafafa] gap-2 transition duration-300 ease-linear my-1'>
          <img src={friend?.image ? friend.image : "/images/profile.png"} className='w-9 h-9 bg-gray-300 rounded-full' alt="" />
          <h1 className='text-[1em] font-sans'>{friend?.name}</h1>
      </div>
  )
}

export default ChatUser