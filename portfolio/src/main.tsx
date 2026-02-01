import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import setupLocatorUI from "@locator/runtime";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";

if (process.env.NODE_ENV === "development") {
  setupLocatorUI();
}

const router = createBrowserRouter([
  {
    path: "/*",
    element: <App />,
    errorElement: <Navigate to="/" replace />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
