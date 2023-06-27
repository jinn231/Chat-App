import React, { useRef, useState } from 'react';
import AddLinkIcon from '@mui/icons-material/AddLink';
import SendIcon from '@mui/icons-material/Send';
import Axios from '@/Axios';
import { io } from 'socket.io-client';
import { useEffect } from 'react';

const MessageBox = ({sendMessage}) => {
  const fileRef = useRef(null);
  const [message, setNewMessage] = useState("");
  const socket = useRef()

  useEffect(() => {
    socket.current = io("ws://localhost:8000");
  }, []);

  const sendNewMessage = async () => {
    await sendMessage(message)
    setNewMessage("")
  }

  const fileUpload = () => {
      fileRef.current.click()
  }

  return (
    <>
      <div className='flex-grow rounded-l-full flex bg-[#e0e0e0] items-center pr-3 rounded-r-full'>
        <input className='px-5 text-gray-600 py-2 w-full space-x-2' onChange={e => setNewMessage(e.target.value)} value={message} placeholder='Type here...' />
        <AddLinkIcon onClick={fileUpload} className='rotate-[-45deg] cursor-pointer text-gray-500' />
        <input type='file' className='hidden' ref={fileRef} />
      </div>

      <button className='bg-[#e0e0e0] cursor-pointer px-2 mx-3 rounded-full text-blue-500' onClick={sendNewMessage}>
        <SendIcon fontSize='medium' />
      </button>
    </>
  )
}

export default MessageBox