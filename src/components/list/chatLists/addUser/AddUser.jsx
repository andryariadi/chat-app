import { TiUserAdd } from "react-icons/ti";
import "./addUser.css";

const AddUser = () => {
  return (
    <div className="addUser">
      <form action="">
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      <div className="user">
        <div className="detailUser">
          <img src="https://i.pinimg.com/236x/a5/7a/bc/a57abc03ca6359ff7b15224fa525a96a.jpg" alt="User" />
          <span>Alvine</span>
        </div>
        <button>
          <TiUserAdd size={24} className="icon" />
        </button>
      </div>
    </div>
  );
};

export default AddUser;
