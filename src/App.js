import { Routes, Route } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginPage from './Pages/LoginPage'
import LobbyPage from './Pages/LobbyPage'
import BlockPage from './Pages/BlockPage'

function App() {

  return (
    <>
      <div className="header"><h1>Learn JS Easily</h1></div>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/LobbyPage" element={<LobbyPage />} />
        <Route path="/BlockPage/:sessionId" element={<BlockPage />} />
      </Routes>
    </>
  );
}

export default App;
