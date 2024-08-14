import { BiSearchAlt } from "react-icons/bi";
import "./chatLists.css";
import { LuMinus, LuPlus } from "react-icons/lu";
import { useEffect, useState } from "react";
import AddUser from "./addUser/AddUser";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../libs/firebase";
import { useUserStore } from "../../../libs/userStore";
const ChatLists = () => {
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState([]);

  const { currentUser } = useUserStore();

  useEffect(() => {
    if (!currentUser.id) return;

    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      console.log("Current data: ", res.data());

      const items = res.data()?.chats || [];

      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return { ...item, user };
      });

      const chatData = await Promise.all(promises);

      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => unSub();
  }, [currentUser.id]);

  console.log(chats);

  return (
    <div className="chatLists">
      <div className="search">
        <div className="searchBar">
          <BiSearchAlt size={24} />
          <input type="text" placeholder="Search..." />
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          {open ? <LuMinus size={24} /> : <LuPlus size={24} />}
        </div>
      </div>

      <div className="userChatContainer">
        {chats.length > 0 ? (
          chats.map((chat) => (
            <div className="userChat" key={chat.id}>
              <img src="https://i.pinimg.com/236x/a5/7a/bc/a57abc03ca6359ff7b15224fa525a96a.jpg" alt="User" />
              <div className="text">
                <span>Tasmiah</span>
                <p>Hello bre...</p>
              </div>
            </div>
          ))
        ) : (
          <div className="noChat">No chat available</div>
        )}
      </div>
      {open && <AddUser />}
    </div>
  );
};

export default ChatLists;
