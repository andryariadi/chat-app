import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import Lists from "./components/list/Lists";

function App() {
  return (
    <>
      <main className="container">
        <Lists />
        <Chat />
        <Detail />
      </main>
    </>
  );
}

export default App;
