import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";

const Login = lazy(() => import("./components/login"));
const Chat = lazy(() => import("./components/Chat"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Login />
            </Suspense>
          }
        />
        <Route
          path="/chat"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Chat />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
