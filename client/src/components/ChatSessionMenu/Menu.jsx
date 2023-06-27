import React, { useEffect, useState } from "react";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import Axios from "@/Axios";
import OnlineUser from "../OnlineUser/OnlineUser";

const Menu = ({ userId, OnlineUser }) => {
  const [friend, setFriend] = useState();
  const [active, setActive] = useState(false);

  useEffect(() => {

    if (userId) getFriends(userId);
  }, [userId]);

  const getFriends = async (userId) => {
    const res = await Axios.get(`users/${userId}`);
    const isActive = OnlineUser.find(u => u.userId === res.data.user._id);

    if (isActive) setActive(true)
    else setActive(false)
    setFriend(res.data.user);
  };

  return (
    <div className="flex justify-between h-[3em] shadow bg-[#fafafa] p-2">
      <div className="flex items-center">
        <img
          className="w-9 h-9 bg-[#f2f2f2] rounded-full"
          src={friend?.image ? friend.image : "/images/profile.png"}
          alt=""
        />
        <div className="flex flex-col mx-2">
          <h1 className="text-[15px] px-2">{friend?.name}</h1>
          {active ? (
            <p className="text-sm px-2 text-gray-400">Active Now</p>
          ) : (
            <p className="text-sm px-2 text-gray-400">last seen recently</p>
          )}
        </div>
      </div>
      <div className="flex flex-nowrap gap-4 items-center">
        <LocalPhoneOutlinedIcon />
        <VideocamOutlinedIcon />
      </div>
    </div>
  );
};

export default Menu;
