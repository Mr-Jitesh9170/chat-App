import { BrowserRouter, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import { Loader } from "./loader/loading";

const Authentication = lazy(() => import("./components/auth"));
const Chat = lazy(() => import("./components/Chat"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<Loader />}>
              <Authentication />
            </Suspense>
          }
        />
        <Route
          path="/chat"
          element={
            <Suspense fallback={<Loader value={"Loading...."} />}>
              <Chat />
            </Suspense>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
