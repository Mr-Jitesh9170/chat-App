import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./pages/auth"
import DashBoard from "./pages/dashboard";
import { ErrorPage } from "./error/error";
import Profile from "./pages/profile";
import Chat from "./pages/chat";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Authentication />}
        />
        <Route
          path="/chit-chat/dashboard"
          element={<DashBoard />}
        >
          <Route
            path="/chit-chat/dashboard/profile"
            element={<Profile />}
          />
          <Route
            path="/chit-chat/dashboard/chat/:userId"
            element={<Chat />}
          />
        </Route>
        <Route
          path="*"
          element={<ErrorPage />} 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;