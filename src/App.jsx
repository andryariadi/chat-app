import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Lists from "./components/list/Lists";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./libs/firebase";
import { useUserStore } from "./libs/userStore";
import { Loading } from "./components/loading/Loading";

function App() {
  const { currentUser, isLoading, fetchUserinfo } = useUserStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user, "<----dihome");
      fetchUserinfo(user?.uid);
    });

    return () => unSub();
  }, [fetchUserinfo]);

  if (isLoading) return <Loading />;

  console.log(currentUser, "<----dihome2");

  return (
    <>
      <main className="container">
        {currentUser ? (
          <>
            <Lists />
            <Chat />
            <Detail />
          </>
        ) : (
          <Login />
        )}
        <Notification />
      </main>
    </>
  );
}

export default App;
