import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Lists from "./components/list/Lists";
import Login from "./components/login/Login";

function App() {
  const user = false;
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
      </main>
    </>
  );
}

export default App;
