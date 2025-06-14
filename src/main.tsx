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
import ProtectedRoute from "./components/Auth/ProtectedRoute";
import MyEventsPage from "./pages/MyEvents";

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
    path: "/perfil",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    // Rota para ver o perfil de qualquer usuário (com ID na URL)
    path: "/perfil/:userId",
    element: (
      <ProtectedRoute>
        <ProfilePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/MyEvents",
    element: (
      <ProtectedRoute>
        <MyEventsPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/edit-event/:eventId",
    element: (
      <ProtectedRoute>
        <CreateEvent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create-event",
    element: (
      <ProtectedRoute>
        <CreateEvent />
      </ProtectedRoute>
    ),
  },
  {
    path: "/event-details/:eventId",
    element: <EventDetails />,
  },
  {
    path: "/Register",
    element: <Register />,
  },
]);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");

const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
