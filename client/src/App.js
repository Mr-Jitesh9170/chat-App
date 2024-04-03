import { BrowserRouter, Route, Routes } from "react-router-dom";
import Authentication from "./components/auth"
import Chat from "./components/Chat";
import { ErrorPage } from "./error/error";
import { useState } from "react";


// import { lazy, Suspense } from "react";
// import { Loader } from "./loader/loading";
// const Authentication = lazy(() => import("./components/auth"));
// const Chat = lazy(() => import("./components/Chat"));

function App() {
  const [user, setUser] = useState("")
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Authentication setUser={setUser} />}
        />
        <Route
          path="/chat"
          element={user ? <Chat /> : <ErrorPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
