import { ChatApp } from "./ChatApp/chatApp";
import { Routes, BrowserRouter, Route } from "react-router-dom"
import { Register } from "./ChatApp/register";
import { ChatUI } from "./ChatComponents/chatUI";
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ChatApp />} path="/" />
        <Route element={<Register />} path="/register" />
        <Route element={<ChatUI />} path="/Chats"/>
      </Routes>
    </BrowserRouter>
  )
}

