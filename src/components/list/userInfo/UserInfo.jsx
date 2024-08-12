import { MdMoreHoriz } from "react-icons/md";
import "./userInfo.css";
import { IoVideocam } from "react-icons/io5";
import { LiaEditSolid } from "react-icons/lia";

const UserInfo = () => {
  return (
    <div className="userInfo">
      <div className="user">
        <img src={"https://i.pinimg.com/236x/3b/51/e0/3b51e0cfb1c0d914da29756b5ed4c4ca.jpg"} alt="Profile" />
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
