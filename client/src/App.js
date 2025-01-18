import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./pages/dashboard";
import Profile from "./pages/profile";
import Chat from "./pages/chat";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chit-chat/dashboard" element={<DashBoard />} >
          <Route path="/chit-chat/dashboard/profile" element={<Profile />} />
          <Route path="/chit-chat/dashboard/chat/:roomId" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;