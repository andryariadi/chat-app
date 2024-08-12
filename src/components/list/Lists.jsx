import ChatLists from "./chatLists/ChatLists";
import "./lists.css";
import UserInfo from "./userInfo/UserInfo";

const Lists = () => {
  return (
    <div className="list">
      <UserInfo />
      <ChatLists />
    </div>
  );
};

export default Lists;
