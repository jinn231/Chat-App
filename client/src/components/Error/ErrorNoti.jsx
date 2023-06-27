import React from 'react'
import style from "./Error.module.css"
import CloseIcon from '@mui/icons-material/Close';

const ErrorNoti = ({message, setErrMessage, setError}) => {
  return (
    <div className={style.error}>
        <img className='w-5 h-5 mx-2' src="/images/wrong.png" alt="" />
        <p>{message}</p>
        <div className='absolute top-0 right-0 m-2 whitespace-nowrap w-auto' onClick={e => {
            setError(false)
            setErrMessage("")            
        }}>
            <CloseIcon />
        </div>
    </div>
  )
}

export default ErrorNoti