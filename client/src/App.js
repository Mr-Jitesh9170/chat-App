import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./components/auth"
import DashBoard from "./components/dashboard";
import { ErrorPage } from "./error/error";
 
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
