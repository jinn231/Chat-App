import SearchBar from "@/components/SearchBar/SearchBar";
import React, { useEffect, useRef, useState } from "react";
import MessageBox from "@/components/MessageBox/MessageBox";
import Menu from "@/components/ChatSessionMenu/Menu";
import ChatUser from "@/components/ChatUser/ChatUser";
import Axios from "@/Axios";
import axios from "axios";
import { useRouter } from "next/router";
import Message from "@/components/ChatSessoin/Message";
import NoMessage from "@/components/NoMessage/NoMessage";
import { io } from "socket.io-client";
import OnlineUser from "@/components/OnlineUser/OnlineUser";
import ModalCard from "@/components/Modal/modal"
import ErrorNoti from "@/components/Error/ErrorNoti";
import SettingsIcon from '@mui/icons-material/Settings';
import Link from "next/link";
const Chat = ({ user }) => {
  const router = useRouter();
  const [conversation, setConversation] = useState([]);
  const [currentChat, setCurrentchat] = useState(null);
  const [messages, setMessage] = useState([]);
  const messageRef = useRef();
  const [onlineUsers, setOnlineUsers] = useState([])
  const socket = useRef();
  const [sendedMessage, setSendedMessage] = useState(null);
  const [modal, setModal] = useState(false)
  const [searchUsers, setSearchUser] = useState([])
  const [error, setError] = useState(false);
  const [errMessage, setErrMessage] = useState("")
  
  useEffect(() => {
    if(!user){
      router.push("/")
    }
  }, [])

  
  useEffect(() => {
    socket.current = io("ws://localhost:8000");
  }, []);

  useEffect(() => {
    socket.current.on("start-conversation-noti", (data) => {
      setConversation(prev => [...prev, data])
    })
  }, [conversation, currentChat])

  useEffect(() => {
    socket.current.on("get-message", (data) => {
      setSendedMessage({
        conversationId: data.conversationId,
        senderId: data.senderId,
        message: data.message,
        createdAt: Date.now()
      })
    })    
  }, [])

  useEffect(() => {
    sendedMessage && currentChat?.members.includes(sendedMessage.senderId) &&
    setMessage(prev => [...prev, sendedMessage])  
  }, [sendedMessage, currentChat])

  useEffect(() => {
    socket.current.emit("Add-user", user?._id);

    socket.current.on("Get-User", (users) => {
      setOnlineUsers(users)
      });
  }, [user]);

  useEffect(() => {
    if (user) {
      getConversation();
    } else {
      router.push("/auth/sign-in");
    }
  }, [user?._id]);
  
  useEffect(() => {
    if (currentChat) getMessage(currentChat._id);
  }, [currentChat]);
  
  useEffect(() => {
    messageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const getMessage = async (conversation_id) => {
    const res = await Axios.get(`/message/${conversation_id}`);

    setMessage(res.data);
  };

  const getConversation = async () => {
    const res = await Axios.get(`/conversation/${user?._id}`);

    setConversation(res.data);
  };

  const sendMessage = async (message) => {
    const data = {
      message: message,
      conversationId: currentChat._id,
      sender: user._id
    }
    
    const res = await Axios.post("/message/new-message", data)

    socket.current.emit("send-message", {
      message: message,
      sender: user._id,
      receiverId: currentChat?.members.filter((i) => i !== user._id).toString(), 
      conversationId: currentChat._id
    })

    setMessage([...messages, res.data])
  }


  const searchUser = async (query) => {
    if(query.includes("@")){
      const res = await Axios.get(`/users/findbyemail?e=${query}`);
      setSearchUser(res.data)
    }else{
      const res = await Axios.get(`/users/findbyname?n=${query}`);

      setSearchUser(res.data)
    }
    setModal(!modal)
  }

  const createConversation = async (senderId, receiverId) => {

    const data = {
        senderId,
        receiverId
    }

    try {
        const res = await Axios.post("/conversation/create", data);
        getConversation()
        setCurrentchat(res.data)
        setModal(!modal)   

        socket.current.emit("start-conversation", res.data)
    } catch ({response}) {
        setError(true)
        setErrMessage(response.data.message)
    }
}

if(user){
    return (
    <>
      <div className="flex">
        <div className="w-1/3 border bg-[#ebf1f1]">
          <div className="w-[90%] mx-auto my-3 flex hover:cursor-pointer">
            <Link href={`/users/profile`}>
              <img src={user?.image ? user.image : "/images/profile.png"} className="w-9 h-9 rounded-full bg-[#fafafa] mx-2" alt="logo" />
              <h1 className="my-1 mx-2 text-xl font-serif hover:underline underline-offset-2">
                {user?.name}
                <SettingsIcon fontSize="small" />
              </h1>
            </Link>

          </div>
          <div className="flex bg-[#ebf1f1] my-2 overflow-x-scroll scroll-smooth overflow-y-hidden h-auto">
            {
              onlineUsers?.map(u => u.userId !== user._id && <OnlineUser key={u.userId} userId={u.userId} />)
            }
          </div>
          <div className="w-full">
            <SearchBar modal={modal} setModal={setModal} searchUser={searchUser} />
          </div>
          <div className="w-[90%] mx-auto mt-[1em]">
            {conversation?.map((c) => (
              <div key={c._id} onClick={(e) => setCurrentchat(c)}>
                <ChatUser members={c.members} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3 border flex flex-col h-screen overflow-hidden">
          {currentChat ? (
            <>
              <div className="flex-grow flex flex-col h-[80%]">
                <Menu
                  className="border"
                  userId={currentChat?.members.filter((i) => i !== user._id)}
                  OnlineUser={onlineUsers}
                />
                <div className="border flex-grow overflow-y-scroll scroll-smooth h-[100%]">
                  {messages.map((message) => (
                    <div key={message.message + message.createdAt} ref={messageRef}>
                      <Message
                        message={message.message}
                        mine={message.senderId === user._id}
                        date={message.createdAt}
                      />
                    </div>
                  ))}
                </div>
              </div>
              <div className="w-full flex px-5 py-2">
                <MessageBox
                  sendMessage={sendMessage}
                />
              </div>
            </>
          ) : (
            <NoMessage />
          )}
        </div>
      </div>
          
          {
            modal ?
             <ModalCard setCurrentchat={setCurrentchat} createConversation={createConversation} getConversation={getConversation} modal={modal} setModal={setModal} searchUsers={searchUsers} currentUser={user} setError={setError} setErrMessage={setErrMessage} />
              : null
          }

          {
            error && <ErrorNoti message={errMessage} setError={setError} setErrMessage={setErrMessage} />
          }
    </>
  );
}

};

export const getServerSideProps = async ({ req }) => {
  try {
    const cookie = req.headers.cookie;
    const res = await axios.get("http://localhost:8080/api/users/find", {
      headers: { Cookie: cookie },
    });
    return {
      props: {
        user: res.data.user,
      },
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        user: null,
      },
    };
  }
};

export default Chat;
