import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import "./detail.css";
import { useEffect, useState } from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { LoaderBtn } from "../loading/Loading";
import { auth, db } from "../../libs/firebase";
import { useChatStore } from "../../libs/chatStore";
import { arrayRemove, arrayUnion, doc, onSnapshot, updateDoc } from "firebase/firestore";

const Detail = () => {
  const [openChatSettings, setOpenChatSettings] = useState(false);
  const [openPrivacyHelp, setOpenPrivacyHelp] = useState(false);
  const [openSharedPhotos, setOpenSharedPhotos] = useState(false);
  const [openSharedFiles, setOpenSharedFiles] = useState(false);
  const [loading, setLoading] = useState(false);
  const [chat, setChat] = useState(null);

  const { chatId, user, isCurrentUserBlocked, isReceiverBlocked, changeBlock, resetChat } = useChatStore();

  useEffect(() => {
    const onSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => onSub();
  }, [chatId]);

  const handleBlock = async () => {
    if (!user) return;

    const userDocRef = doc(db, "users", user.id);

    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id),
      });

      changeBlock();
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    setLoading(true);
    auth.signOut();
    resetChat();
  };

  console.log(chat, "<----didetail");

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "/noAvatar.png"} alt="User" />
        <div className="texts">
          <span>{user?.username}</span>
          <p>Wonderfull life...</p>
        </div>
      </div>

      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <MdOutlineKeyboardArrowUp
              size={24}
              className="icon"
              onClick={() => setOpenChatSettings(!openChatSettings)}
              style={{
                transform: openChatSettings ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </div>
          {/* Konten lain untuk Chat settings */}
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <MdOutlineKeyboardArrowUp
              size={24}
              className="icon"
              onClick={() => setOpenPrivacyHelp(!openPrivacyHelp)}
              style={{
                transform: openPrivacyHelp ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </div>
          {/* Konten lain untuk Privacy & help */}
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <MdOutlineKeyboardArrowUp
              size={24}
              className="icon"
              onClick={() => setOpenSharedPhotos(!openSharedPhotos)}
              style={{
                transform: openSharedPhotos ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </div>
          {openSharedPhotos &&
            chat.messages.map((message) => (
              <div className="photos" key={message.createdAt}>
                <div className="photoItem">
                  <img src={message.img} alt="Image" />
                  <span>photo_2024_13</span>
                </div>
                <div className="icon">
                  <HiOutlineDownload size={20} />
                </div>
              </div>
            ))}
        </div>
        <div className="option">
          <div className="title">
            <span>Shared files</span>
            <MdOutlineKeyboardArrowUp
              size={24}
              className="icon"
              onClick={() => setOpenSharedFiles(!openSharedFiles)}
              style={{
                transform: openSharedFiles ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          </div>
          {openSharedFiles && (
            <div className="photos">
              <div className="photoItem">
                <img src="https://cdn.pixabay.com/photo/2024/04/25/06/44/ai-generated-8719074_1280.png" alt="Image" />
                <span>photo_2024_13</span>
              </div>
              <div className="icon">
                <HiOutlineDownload size={20} />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="buttons">
        <button className="btnUser" onClick={handleBlock}>
          {isCurrentUserBlocked ? "You are block!" : isReceiverBlocked ? "User blocked" : "Block User"}
        </button>
        <button className="btnAuth" onClick={handleLogout}>
          {loading ? <LoaderBtn /> : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Detail;
