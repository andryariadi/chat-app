import { ImPhone } from "react-icons/im";
import "./chat.css";
import { IoCamera, IoVideocam } from "react-icons/io5";
import { TbInfoCircleFilled } from "react-icons/tb";
import { IoMdImages } from "react-icons/io";
import { FaMicrophoneAlt } from "react-icons/fa";
import { BsEmojiWinkFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const handleEmoji = (e) => {
    console.log(e);
    setText((prev) => prev + e.emoji);
    setOpen(!open);
  };

  console.log(text);

  return (
    <section className="chat">
      <div className="top">
        <div className="user">
          <img src="https://i.pinimg.com/236x/a5/7a/bc/a57abc03ca6359ff7b15224fa525a96a.jpg" alt="User" />
          <div className="text">
            <span>Tasmiah</span>
            <p>Wonderfull life...</p>
          </div>
        </div>
        <div className="icons">
          <ImPhone size={20} className="icon" />
          <IoVideocam size={24} className="icon" />
          <TbInfoCircleFilled size={24} className="icon" />
        </div>
      </div>

      <div className="center">andry</div>

      <div className="bottom">
        <div className="icons">
          <IoMdImages size={22} className="icon" />
          <IoCamera size={22} className="icon" />
          <FaMicrophoneAlt size={20} className="icon" />
        </div>
        <input type="text" placeholder="Type a message..." value={text} onChange={(e) => setText(e.target.value)} />
        <div className="emoji">
          <BsEmojiWinkFill size={18} className="icon" onClick={() => setOpen(!open)} />
          <EmojiPicker open={open} className="emojiPicker" theme="dark" onEmojiClick={handleEmoji} />
        </div>
        <button>Send</button>
      </div>
    </section>
  );
};

export default Chat;
