import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./components/auth"
import DashBoard from "./components/dashboard";
import Chat from "./components/Chat";
import { ErrorPage } from "./error/error";
import Profile from "./components/profile";



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
            path="/chit-chat/dashboard/chat"
            element={<Chat />}
          />
          <Route
            path="/chit-chat/dashboard/profile"
            element={<Profile />}
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

// http://localhost:3000
// http://localhost:3000/chit-chat/dashboard
// http://localhost:3000/chit-chat/dashboard/chat