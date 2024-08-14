import { IoIosEye, IoIosEyeOff, IoIosMail } from "react-icons/io";
import "./login.css";
import { useState } from "react";
import { HiMiniUser } from "react-icons/hi2";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../libs/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../libs/upload";
import { LoaderBtn } from "../loading/Loading";

const Login = () => {
  const [isPasswordLogin, setIsPasswordLogin] = useState(false);
  const [isPasswordRegister, setIsPasswordRegister] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

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

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoadingRegister(true);

    const formData = new FormData(e.target);

    const { username, email, password } = Object.fromEntries(formData);

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const imgUrl = await upload(avatar.file);

      await setDoc(doc(db, "users", res.user.uid), {
        id: res.user.uid,
        username,
        email,
        avatar: imgUrl,
        blocked: [],
      });

      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });

      toast.success("Account created successfully! You can login now!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoadingRegister(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoadingLogin(true);

    const formData = new FormData(e.target);

    const { email, password } = Object.fromEntries(formData);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successfully!");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoadingLogin(false);
    }
  };

  console.log(avatar);

  return (
    <div className="login">
      <div className="auth">
        <h2>Welcome back..</h2>
        <form onSubmit={handleLogin}>
          <div className="field">
            <input type="text" placeholder="Email" name="email" />
            <IoIosMail size={24} className="icon" />
          </div>
          <div className="field">
            <input type={isPasswordLogin ? "text" : "password"} placeholder="Password..." name="password" />
            {isPasswordLogin ? <IoIosEyeOff size={24} className="icon" onClick={() => setIsPasswordLogin(!isPasswordLogin)} /> : <IoIosEye size={24} className="icon" onClick={() => setIsPasswordLogin(!isPasswordLogin)} />}
          </div>
          <button disabled={loadingLogin}>{loadingLogin ? <LoaderBtn /> : "Sing In"}</button>
        </form>
      </div>

      <div className="separator" />

      <div className="auth">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
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
          <button disabled={loadingRegister}>{loadingRegister ? <LoaderBtn /> : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
