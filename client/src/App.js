import { Routes, BrowserRouter, Route } from "react-router-dom"
import { Register } from "./Components/register";
import { ChatUI } from "./Components/chatUI";
import { LoginPage } from "./Components/login";
import { useState } from "react";
import { Error } from "./Components/error";

export function App() {
  const [rendor, setRendor] = useState(false)
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<LoginPage setRendor={setRendor} />} path="/" />
          <Route element={<Register />} path="/register" />
          {
            rendor ? <Route element={<ChatUI />} path="/chats" /> : <Route element={<Error />} path="/chats" />
          }
        </Routes>
      </BrowserRouter>

    </>
  )
}

