import { BrowserRouter, Routes, Route } from "react-router-dom";
import { NavBar } from "../types";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Quiz from "./pages/Quiz";
import Nav from "./components/Nav";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import BibleStory from "./pages/BibleStory";

const NavBars: NavBar[] = [
  { path: "/", element: <Home /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/quiz", element: <Quiz /> },
  { path: "/register", element: <Registration /> },
  { path: "/dashboard", element: <Dashboard />, },
  { path: "/Bible-story", element: <BibleStory />}
];

function App() {
  return (
    <>
      <BrowserRouter>
        <Nav />
        <Routes>
          {NavBars.map((item) => (
            <Route key={item.path} path={item.path} element={item.element} />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
