import { BiSearchAlt } from "react-icons/bi";
import "./chatLists.css";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useState } from "react";
const ChatLists = () => {
  const [open, setOpen] = useState(false);

  return (
    <div className="chatLists">
      <div className="search">
        <div className="searchBar">
          <BiSearchAlt size={24} />
          <input type="text" placeholder="Search..." />
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          {open ? <LuMinus size={24} /> : <LuPlus size={24} />}
        </div>
      </div>

      <div className="userChatContainer">
        {[...Array(10)].map((_, i) => (
          <div className="userChat" key={i}>
            <img src="./noAvatar.png" alt="User" />
            <div className="text">
              <span>Tasmiah</span>
              <p>Hello bre...</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatLists;
