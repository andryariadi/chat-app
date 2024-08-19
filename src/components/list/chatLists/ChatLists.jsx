import { BiSearchAlt } from "react-icons/bi";
import "./chatLists.css";
import { LuMinus, LuPlus } from "react-icons/lu";
import { Suspense, useEffect, useState } from "react";
import AddUser from "./addUser/AddUser";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../libs/firebase";
import { useUserStore } from "../../../libs/userStore";
import { lazy } from "react";
import { LoaderComponent } from "../../loading/Loading";

const ChatItem = lazy(() => import("./ChatItem"));

const ChatLists = () => {
  const [open, setOpen] = useState(false);
  const [chats, setChats] = useState([]);
  const [inputSearch, setInputSearch] = useState("");

  const { currentUser } = useUserStore();

  useEffect(() => {
    if (!currentUser.id) return;

    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      console.log("Current data: ", res.data());

      const items = res.data()?.chats || [];

      console.log(items, "items");

      const promises = items.map(async (item) => {
        const userDocRef = doc(db, "users", item.receiverId);
        const userDocSnap = await getDoc(userDocRef);

        const user = userDocSnap.data();

        return { ...item, user };
      });

      const chatData = await Promise.all(promises);

      console.log(chatData, "chatData");

      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
    });

    return () => unSub();
  }, [currentUser.id]);

  const filteredChats = chats.filter((chat) => {
    return chat.user.username.includes(inputSearch);
  });

  console.log(chats, filteredChats);

  return (
    <div className="chatLists">
      <div className="search">
        <div className="searchBar">
          <BiSearchAlt size={24} />
          <input type="text" placeholder="Search..." onChange={(e) => setInputSearch(e.target.value)} />
        </div>
        <div className="icon" onClick={() => setOpen(!open)}>
          {open ? <LuMinus size={24} /> : <LuPlus size={24} />}
        </div>
      </div>

      <div className="userChatContainer">
        {filteredChats.length > 0 ? (
          <Suspense fallback={<LoaderComponent />}>
            {filteredChats.map((chat) => (
              <ChatItem key={chat.chatId} chat={chat} />
            ))}
          </Suspense>
        ) : (
          <div className="noChat">No chat available</div>
        )}
      </div>
      {open && <AddUser />}
    </div>
  );
};

export default ChatLists;
