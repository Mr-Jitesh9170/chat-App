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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<DashBoard />} >
          <Route index element={<Profile />} />
          <Route path="/chat/:userId" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App; 