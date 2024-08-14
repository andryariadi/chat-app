import { MdMoreHoriz } from "react-icons/md";
import "./userInfo.css";
import { IoVideocam } from "react-icons/io5";
import { LiaEditSolid } from "react-icons/lia";
import { useUserStore } from "../../../libs/userStore";

const UserInfo = () => {
  const { currentUser } = useUserStore();

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "/noAvatar.png"} alt="Profile" />
        <h2>{currentUser.username}</h2>
      </div>
      <div className="icons">
        <MdMoreHoriz size={24} className="icon" />
        <IoVideocam size={24} className="icon" />
        <LiaEditSolid size={24} className="icon" />
      </div>
    </div>
  );
};

export default UserInfo;
