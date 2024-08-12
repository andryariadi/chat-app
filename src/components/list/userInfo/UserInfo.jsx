import { MdMoreHoriz } from "react-icons/md";
import "./userInfo.css";
import { IoVideocam } from "react-icons/io5";
import { LiaEditSolid } from "react-icons/lia";

const UserInfo = () => {
  return (
    <div className="userInfo">
      <div className="user">
        <img src="./noAvatar.png" alt="Profile" />
        <h2>Andry Ariadi</h2>
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
