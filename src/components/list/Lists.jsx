import ChatLists from "./chatLists/ChatLists";
import "./lists.css";
import UserInfo from "./userInfo/UserInfo";

const Lists = () => {
  return (
    <section className="list">
      <UserInfo />
      <ChatLists />
    </section>
  );
};

export default Lists;
