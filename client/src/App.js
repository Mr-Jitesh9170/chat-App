import { ChatApp } from "./ChatApp/chatApp";
import { Routes, BrowserRouter, Route } from "react-router-dom"
import { Register } from "./ChatApp/register";
export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ChatApp />} path="/" />
        <Route element={<Register />} path="/register" />
      </Routes>
    </BrowserRouter>
  )
}

