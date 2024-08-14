import { MdOutlineKeyboardArrowUp } from "react-icons/md";
import "./detail.css";
import { useState } from "react";
import { HiOutlineDownload } from "react-icons/hi";
import { LoaderBtn } from "../loading/Loading";
import { auth } from "../../libs/firebase";

const Detail = () => {
  const [openChatSettings, setOpenChatSettings] = useState(false);
  const [openPrivacyHelp, setOpenPrivacyHelp] = useState(false);
  const [openSharedPhotos, setOpenSharedPhotos] = useState(false);
  const [openSharedFiles, setOpenSharedFiles] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogout = () => {
    setLoading(true);
    auth.signOut();
  };

  return (
    <div className="detail">
      <div className="user">
        <img src="https://i.pinimg.com/236x/a5/7a/bc/a57abc03ca6359ff7b15224fa525a96a.jpg" alt="User" />
        <div className="texts">
          <span>Tasmiah</span>
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
          {openSharedPhotos && (
            <>
              <div className="photos">
                <div className="photoItem">
                  <img src="https://cdn.pixabay.com/photo/2024/04/25/06/44/ai-generated-8719074_1280.png" alt="Image" />
                  <span>photo_2024_13</span>
                </div>
                <div className="icon">
                  <HiOutlineDownload size={20} />
                </div>
              </div>
              <div className="photos">
                <div className="photoItem">
                  <img src="https://cdn.pixabay.com/photo/2024/04/25/06/44/ai-generated-8719074_1280.png" alt="Image" />
                  <span>photo_2024_13</span>
                </div>
                <div className="icon">
                  <HiOutlineDownload size={20} />
                </div>
              </div>
              <div className="photos">
                <div className="photoItem">
                  <img src="https://cdn.pixabay.com/photo/2024/04/25/06/44/ai-generated-8719074_1280.png" alt="Image" />
                  <span>photo_2024_13</span>
                </div>
                <div className="icon">
                  <HiOutlineDownload size={20} />
                </div>
              </div>
            </>
          )}
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
        <button className="btnUser">Block User</button>
        <button className="btnAuth" onClick={handleLogout}>
          {loading ? <LoaderBtn /> : "Logout"}
        </button>
      </div>
    </div>
  );
};

export default Detail;
