import { TiUserAdd } from "react-icons/ti";
import "./addUser.css";
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../../../libs/firebase";
import { useState } from "react";
import { useUserStore } from "../../../../libs/userStore";

const AddUser = () => {
  const [user, setUser] = useState(null);
  const { currentUser } = useUserStore();
  const [error, setError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    setError(null);

    const formData = new FormData(e.target);
    const username = formData.get("username");

    if (!username.trim()) {
      setError("Username cannot be empty");
      return;
    }

    try {
      const userRef = collection(db, "users");

      const q = query(userRef, where("username", "==", username));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      } else {
        setUser(null);
        setError("User not found");
      }

      // console.log(querySnapshot, "<---diadduser1");
    } catch (error) {
      console.log(error);
      setError("An error occurred while searching for the user.");
    }
  };

  const handleAddUserChat = async () => {
    if (!user) return;

    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");
    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });

      setUser(null);
    } catch (error) {
      console.log(error);
      setError("An error occurred while adding the user to the chat.");
    }
  };

  console.log(user, "<----diadduser2");

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {error && <div className="error">{error}</div>}
      {user && (
        <div className="user">
          <div className="detailUser">
            <img src={user.avatar || "/noAvatar.png"} alt="User" />
            <span>{user.username}</span>
          </div>
          <button type="button" onClick={handleAddUserChat}>
            <TiUserAdd size={24} className="icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
