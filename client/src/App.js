import { BrowserRouter, Route, Routes } from "react-router-dom";
// import { lazy, Suspense } from "react";
import Authentication from "./components/auth"
import Chat from "./components/Chat";

// import { Loader } from "./loader/loading";

// const Authentication = lazy(() => import("./components/auth"));
// const Chat = lazy(() => import("./components/Chat"));

function App() {
  return (
    <BrowserRouter> 
      <Routes>
        <Route
          path="/"
          element={<Authentication />}
        />
        <Route
          path="/chat"
          element={
            <Chat />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
