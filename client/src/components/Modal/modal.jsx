import React, { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import style from "./modal.module.css";

const ModalCard = ({modal, setModal, searchUsers, currentUser, createConversation}) => {

    const [loading, setLoading] = useState(false)
    const [userPf, setUserPf] = useState(null);

  return (
    <>
    <div className="w-full h-full absolute top-0 bg-transparent flex flex-col justify-center">
        <div className="w-[70%] mx-auto h-[80%] bg-slate-300 relative rounded-xl shadow-md overflow-x-hidden overflow-y-scroll p-10">
        <div className="absolute right-0 top-0 m-3 cursor-pointer" onClick={e => setModal(!modal)}>
            <CloseIcon />
        </div>
            {
                searchUsers ? (searchUsers.map(
                    user => user._id !== currentUser._id && (
                        <div key={user._id} className='p-4 px-3 flex items-center justify-between rounded-lg shadow-md cursor-pointer hover:bg-[#f5f5f5] bg-[#fafafa] my-2 transition duration-300 ease-linear gap-3'>
                            <div onClick={e => setUserPf(user)} className='flex items-center gap-2'>
                                <img src={user.image ? user.image : `/images/profile.png`} className='w-9 h-9 bg-gray-300 rounded-full ' alt="" />
                                <h1 className='text-[1em] font-sans underline underline-offset-2'>{user.name}</h1>
                            </div>
                            <button disabled={loading ? true : false} onClick={e =>{
                                setLoading(true)
                                createConversation(currentUser._id, user._id)
                                .then(e => setLoading(false))
                            }
                        } className='text-sm bg-[#e9e7e7] px-3 py-2 rounded-md hover:shadow-md text-slate-600' >Send message</button>
                        </div>
                    )
                )) : <p className='text-black'>Loading</p>
            }
        </div>
    </div>

        
    {
        userPf && 
        <div className={`w-full h-full absolute top-0 bg-transparent flex flex-col justify-center bg-slate-500 bg-opacity-70`}>
            <div className="w-[30%] mx-auto h-[50%] bg-slate-800 relative rounded-xl shadow-md overflow-x-hidden overflow-y-scroll p-10">
                <div onClick={e => {
                    setUserPf(null)
                }} className="absolute text-white right-0 top-0 m-3 cursor-pointer" >
                    <CloseIcon />
                </div>

                <div className='w-full h-full bg-transparent text-[silver] mx-auto p-2'>
                    <div className='flex justify-center'>
                        <img className='rounded-full w-[130px] h-[130px] border' src={userPf.image ? userPf.image : "/images/profile.png"} alt="" />
                    </div>
                    <h1 className='text-xl p-4 text-center'>{userPf.name}</h1>
                    <p className='underline underline-offset-2'>bio</p>
                    <p className='p-2' >{userPf.bio ? userPf.bio : "-"}</p>
                    <p className='underline underline-offset-2'>phone</p>
                    <p className='p-2' >{userPf.phone ? userPf.bio : "-"}</p>
                </div>
            </div>
        </div>
    }

    </>
  )
}

export default ModalCard;