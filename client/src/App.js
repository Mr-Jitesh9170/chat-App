import { BrowserRouter, Route, Routes } from "react-router-dom";
import DashBoard from "./pages/dashboard";
import Profile from "./pages/profile";
import Chat from "./pages/chat";
import { Login } from "./pages/login";
import { Register } from "./pages/register";
import CallingProfile from "./pages/outgoingCall";

function App() {
  return (
    <BrowserRouter>
      <Routes >
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<DashBoard />} >
          <Route index element={<Profile />} />
          <Route path="/call/:callerId" element={<CallingProfile />} />
          <Route path="/chat/:userId" element={<Chat />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App; 