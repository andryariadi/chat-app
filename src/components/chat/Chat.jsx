import { ImPhone } from "react-icons/im";
import "./chat.css";
import { IoCamera, IoVideocam } from "react-icons/io5";
import { TbInfoCircleFilled } from "react-icons/tb";
import { IoIosSend, IoMdImages } from "react-icons/io";
import { FaMicrophoneAlt } from "react-icons/fa";
import { BsEmojiWinkFill } from "react-icons/bs";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../libs/firebase";
import { useChatStore } from "../../libs/chatStore";
import { useUserStore } from "../../libs/userStore";
import upload from "../../libs/upload";
import { LoaderBtn } from "../loading/Loading";
import { format } from "timeago.js";

const Chat = () => {
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");
  const endRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState(null);
  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
  const { currentUser } = useUserStore();

  const [img, setImg] = useState({
    file: null,
    url: "",
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

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

  const handleImg = (e) => {
    if (e.target.files[0]) {
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleSendMessage = async () => {
    if (text === "" && !img.file) return;

    setLoading(true);

    let imgUrl = null;

    try {
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: Date.now(),
          ...(imgUrl && { img: imgUrl }),
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
    } finally {
      setLoading(false);
    }

    setText("");
    setImg({
      file: null,
      url: "",
    });
  };

  console.log(text, chat, chatId, currentUser, user);

  return (
    <section className="chat">
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "/noAvatar.png"} alt="User" />
          <div className="text">
            <span>{user?.username}</span>
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
          <div className={message.senderId === currentUser.id ? "message own" : "message"} key={message.createdAt}>
            {message.senderId !== currentUser.id && <img src={user?.avatar} alt="Profile" />}
            <div className="texts">
              {message.img && <img src={message.img} alt="Image" />}
              {message.text && <p>{message.text}</p>}
              <span>{format(message.createdAt)}</span>
            </div>
          </div>
        ))}
        {img.url && (
          <div className="message own">
            <div className="texts">
              <img src={img.url} alt="Image" />
            </div>
          </div>
        )}
        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className="icons">
          <label htmlFor="file">
            <IoMdImages size={22} className="icon" />
          </label>
          <input type="file" id="file" style={{ display: "none" }} onChange={handleImg} disabled={isCurrentUserBlocked || isReceiverBlocked} />
          <IoCamera size={22} className="icon" />
          <FaMicrophoneAlt size={20} className="icon" />
        </div>
        <input
          type="text"
          placeholder={isCurrentUserBlocked || isReceiverBlocked ? "You cannot send messages" : "Type a message..."}
          value={text}
          onChange={(e) => setText(e.target.value)}
          disabled={isCurrentUserBlocked || isReceiverBlocked}
        />
        <div className="emoji" disabled={isCurrentUserBlocked || isReceiverBlocked}>
          <BsEmojiWinkFill size={18} className="icon" onClick={() => setOpen(!open)} />
          <EmojiPicker open={open} className="emojiPicker" theme="dark" onEmojiClick={handleEmoji} />
        </div>
        <button onClick={handleSendMessage} disabled={isCurrentUserBlocked || isReceiverBlocked}>
          {loading ? <LoaderBtn /> : <IoIosSend size={24} />}
        </button>
      </div>
    </section>
  );
};

export default Chat;
