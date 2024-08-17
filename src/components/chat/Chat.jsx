import { ImPhone } from "react-icons/im";
import "./chat.css";
import { IoCamera, IoVideocam } from "react-icons/io5";
import { TbInfoCircleFilled } from "react-icons/tb";
import { IoMdImages } from "react-icons/io";
import { FaMicrophoneAlt } from "react-icons/fa";
import { BsEmojiWinkFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../libs/firebase";
import { useChatStore } from "../../libs/chatStore";
import { useUserStore } from "../../libs/userStore";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const endRef = useRef(null);
  const [chat, setChat] = useState(null);
  const { chatId, user } = useChatStore();
  const { currentUser } = useUserStore();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const onSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => onSub();
  }, [chatId]);

  const handleEmoji = (e) => {
    console.log(e);
    setText((prev) => prev + e.emoji);
    setOpen(!open);
  };

  const handleSendMessage = async () => {
    if (text === "") return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: Date.now(),
        }),
      });

      const userIDs = [currentUser.id, user.id];

      userIDs.forEach(async (id) => {
        const userChatsRef = doc(db, "userchats", id);
        const userChatSnapshot = await getDoc(userChatsRef);

        if (userChatSnapshot.exists()) {
          const userChatsData = userChatSnapshot.data();

          const chatIndex = userChatsData.chats.findIndex((chat) => chat.chatId === chatId);

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (error) {
      console.log(error);
    }
  };

  console.log(text, chat, chatId);

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

      <div className="center">
        {chat?.messages?.map((message) => (
          <div className="message own" key={message.createdAt}>
            <img src="https://i.pinimg.com/236x/a5/7a/bc/a57abc03ca6359ff7b15224fa525a96a.jpg" alt="User" />
            <div className="texts">
              {message.img && <img src="https://cdn.pixabay.com/photo/2024/04/25/06/44/ai-generated-8719074_1280.png" alt="Image" />}

              <p>{message.text}</p>
              <span>{message.createdAt}</span>
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

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
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </section>
  );
};

export default Chat;
