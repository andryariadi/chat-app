import { TiUserAdd } from "react-icons/ti";
import "./addUser.css";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../../../libs/firebase";
import { useState } from "react";

const AddUser = () => {
  const [user, setUser] = useState(null);
  const handleSearch = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");

      const q = query(userRef, where("username", "==", username));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setUser(querySnapshot.docs[0].data());
      }

      console.log(querySnapshot.docs[0].data());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      {user && (
        <div className="user">
          <div className="detailUser">
            <img src={user.avatar || "/noAvatar.png"} alt="User" />
            <span>{user.username}</span>
          </div>
          <button>
            <TiUserAdd size={24} className="icon" />
          </button>
        </div>
      )}
    </div>
  );
};

export default AddUser;
