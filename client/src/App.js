import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./components/auth"
import DashBoard from "./components/dashboard";
import { ErrorPage } from "./error/error";
import Notifications from "./pages/notification";
import Profile from "./pages/profile";
import Chat from "./pages/chat";
import { useContext } from "react";
import { UserContext, NotificationContext } from "./utils/contextApi";

function App() {
  const { user, setUser } = useContext(UserContext);
  const { notification, setNotification } = useContext(NotificationContext); 

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Authentication />}
        />
        <Route
          path="/chit-chat/dashboard"
          element={<DashBoard setUser={setUser} notification={notification} setNotification={setNotification} />}
        >
          <Route
            path="/chit-chat/dashboard/:notification"
            element={<Notifications setNotification={setNotification} notification={notification} />}
          />
          <Route
            path="/chit-chat/dashboard/profile"
            element={<Profile />}
          />
          <Route
            path="/chit-chat/dashboard/chat/:user?"
            element={<Chat user={user} />}
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