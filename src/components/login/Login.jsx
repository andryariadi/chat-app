import { IoIosEye, IoIosEyeOff, IoIosMail } from "react-icons/io";
import "./login.css";
import { useState } from "react";
import { HiMiniUser } from "react-icons/hi2";

const Login = () => {
  const [isPasswordLogin, setIsPasswordLogin] = useState(false);
  const [isPasswordRegister, setIsPasswordRegister] = useState(false);

  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const handleAvatar = (e) => {
    console.log(e.target.files[0], "<---dilogin");
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  console.log(avatar);

  return (
    <div className="login">
      <div className="auth">
        <h2>Welcome back..</h2>
        <form action="">
          <div className="field">
            <input type="text" placeholder="Email" name="email" />
            <IoIosMail size={24} className="icon" />
          </div>
          <div className="field">
            <input type={isPasswordLogin ? "text" : "password"} placeholder="Password..." name="password" />
            {isPasswordLogin ? <IoIosEyeOff size={24} className="icon" onClick={() => setIsPasswordLogin(!isPasswordLogin)} /> : <IoIosEye size={24} className="icon" onClick={() => setIsPasswordLogin(!isPasswordLogin)} />}
          </div>
          <button>Sign In</button>
        </form>
      </div>

      <div className="separator" />

      <div className="auth">
        <h2>Create an Account</h2>
        <form action="">
          <label htmlFor="file">
            <img src={avatar.url || "/noAvatar.png"} alt="Avatar" />
            Upload an avatar
          </label>
          <input type="file" id="file" style={{ display: "none" }} onChange={handleAvatar} />

          <div className="field">
            <input type="text" placeholder="Username" name="username" />
            <HiMiniUser size={24} className="icon" />
          </div>
          <div className="field">
            <input type="text" placeholder="Email" name="email" />
            <IoIosMail size={24} className="icon" />
          </div>
          <div className="field">
            <input type={isPasswordRegister ? "text" : "password"} placeholder="Password..." name="password" />
            {isPasswordRegister ? <IoIosEyeOff size={24} className="icon" onClick={() => setIsPasswordRegister(!isPasswordRegister)} /> : <IoIosEye size={24} className="icon" onClick={() => setIsPasswordRegister(!isPasswordRegister)} />}
          </div>
          <button>Sign Up</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
