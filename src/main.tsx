import "./styles/globals.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/create-event",
    element: <CreateEvent />,
  },
  {
    path: "/Event-Details",
    element: <EventDetails />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
]);

const root = createRoot(document.getElementById("root")!);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
