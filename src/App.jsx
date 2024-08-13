import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Lists from "./components/list/Lists";
import Login from "./components/login/Login";
import Notification from "./components/notification/Notification";

function App() {
  const user = true;
  return (
    <>
      <main className="container">
        {user ? (
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
