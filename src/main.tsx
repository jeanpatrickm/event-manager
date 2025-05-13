import "./styles/globals.css";
import { ReactNode, StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import ProfilePage from "./pages/Profile";
import CreateEvent from "./pages/CreateEvent";
import EventDetails from "./pages/EventDetails";
import Register from "./pages/Register";
import ProtectedRoute from "./components/Auth/ProtectedRoute";


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
    element: <ProtectedRoute><ProfilePage /></ProtectedRoute>,
  },
  {
    path: "/create-event",
    element: <ProtectedRoute><CreateEvent /></ProtectedRoute>,
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
  </StrictMode>,
);
