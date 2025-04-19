import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { NavBar } from "../types";

import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import Quiz from "./pages/Quiz";
import Nav from "./components/Nav";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import BibleStory from "./pages/BibleStory";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import Help from "./pages/Help";

const NavBars: NavBar[] = [
  { path: "/", element: <Home /> },
  { path: "/signin", element: <SignIn /> },
  { path: "/quiz", element: <Quiz /> },
  { path: "/register", element: <Registration /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "/Bible-story", element: <BibleStory /> },
  { path: "/admin/login", element: <AdminLogin /> },
  { path: "/admin/dashboard", element: <AdminDashboard /> },
  { path: "/help", element: <Help /> },
];

function App() {


useEffect(() => {
  document.title = "Bible Story Time - Inspiration Time";
}, []);

  const location = useLocation();
  const hideNavBar = location.pathname === "/quiz";
  return (
    <>

        {!hideNavBar && <Nav />}{" "}
        <Routes>
          {NavBars.map((item) => (
            <Route key={item.path} path={item.path} element={item.element} />
          ))}
        </Routes>

    </>
  );
}

export default App;
