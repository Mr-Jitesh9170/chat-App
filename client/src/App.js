import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./components/auth"
import DashBoard from "./components/dashboard";
import { ErrorPage } from "./error/error";
import Notifications from "./pages/notification";
import Setting from "./pages/setting";
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
            path="/chit-chat/dashboard/:notification"
            element={<Notifications header={"Notification"} />}
          />
          <Route
            path="/chit-chat/dashboard/setting"
            element={<Setting />}
          />
          <Route
            path="/chit-chat/dashboard/profile"
            element={<Profile />}
          />
          <Route
            path="/chit-chat/dashboard/chat/user"
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

// http://localhost:3000                                      <----- Login page
// http://localhost:3000/chit-chat/dashboard                  <----- Dashboard page
// http://localhost:3000/chit-chat/dashboard/profile          <----- Profile page
// http://localhost:3000/chit-chat/dashboard/chat             <----- Chat page
// http://localhost:3000/chit-chat/dashboard/notification     <----- Notification page
