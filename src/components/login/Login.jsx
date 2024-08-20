import { IoIosEye, IoIosEyeOff, IoIosMail } from "react-icons/io";
import "./login.css";
import { useState } from "react";
import { HiMiniUser } from "react-icons/hi2";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../libs/firebase";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import upload from "../../libs/upload";
import { LoaderBtn } from "../loading/Loading";
import { useUserStore } from "../../libs/userStore";

const Login = () => {
  const [isPasswordLogin, setIsPasswordLogin] = useState(false);
  const [isPasswordRegister, setIsPasswordRegister] = useState(false);
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingLogin, setLoadingLogin] = useState(false);

  const { fetchUserinfo } = useUserStore();

  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const [registerData, setRegisterData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleInputChange = (e) => {
    setRegisterData({
      ...registerData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLoginInputChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoadingRegister(true);

    const { username, email, password } = registerData;

    // VALIDATE INPUTS
    if (!username || !email || !password) return toast.warn("Please enter inputs!");
    if (!avatar.file) return toast.warn("Please upload an avatar!");

    // VALIDATE UNIQUE USERNAME
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      return toast.warn("Select another username!");
    }

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

      // RESET INPUT FIELDS
      setRegisterData({
        username: "",
        email: "",
        password: "",
      });
      setAvatar({
        file: null,
        url: "",
      });
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

    const { email, password } = loginData;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Login successfully!");
      fetchUserinfo(auth.currentUser.uid);

      // Reset login form
      setLoginData({
        email: "",
        password: "",
      });
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    } finally {
      setLoadingLogin(false);
    }
  };

  return (
    <div className="login">
      <div className="auth">
        <h2>Welcome back..</h2>
        <form onSubmit={handleLogin}>
          <div className="field">
            <input type="text" placeholder="Email" name="email" value={loginData.email} onChange={handleLoginInputChange} />
            <IoIosMail size={24} className="icon" />
          </div>
          <div className="field">
            <input type={isPasswordLogin ? "text" : "password"} placeholder="Password..." name="password" value={loginData.password} onChange={handleLoginInputChange} />
            {isPasswordLogin ? <IoIosEyeOff size={24} className="icon eye" onClick={() => setIsPasswordLogin(!isPasswordLogin)} /> : <IoIosEye size={24} className="icon eye" onClick={() => setIsPasswordLogin(!isPasswordLogin)} />}
          </div>
          <button disabled={loadingLogin}>{loadingLogin ? <LoaderBtn /> : "Sign In"}</button>
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
            <input type="text" placeholder="Username" name="username" value={registerData.username} onChange={handleInputChange} />
            <HiMiniUser size={24} className="icon" />
          </div>
          <div className="field">
            <input type="text" placeholder="Email" name="email" value={registerData.email} onChange={handleInputChange} />
            <IoIosMail size={24} className="icon" />
          </div>
          <div className="field">
            <input type={isPasswordRegister ? "text" : "password"} placeholder="Password..." name="password" value={registerData.password} onChange={handleInputChange} />
            {isPasswordRegister ? (
              <IoIosEyeOff size={24} className="icon eye" onClick={() => setIsPasswordRegister(!isPasswordRegister)} />
            ) : (
              <IoIosEye size={24} className="icon eye" onClick={() => setIsPasswordRegister(!isPasswordRegister)} />
            )}
          </div>
          <button disabled={loadingRegister}>{loadingRegister ? <LoaderBtn /> : "Sign Up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
