import React from 'react'
import style from "./Message.module.css"
import {format} from "timeago.js"

const Message = ({ref,message, mine, date}) => {
  return (
    <div ref={ref} className={mine ? style.my_message_container : style.message_container}>
        <div>
          <p className={mine ? style.my_message : style.message} >
            {message}
          </p>
         <span className='text-gray-700 p-[.5em] px-8' style={{textAlign: mine ? "right" : "left"}}>{format(date)}</span>
        </div>
    </div>
  )
}

export default Message;