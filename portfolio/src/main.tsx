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
import IntroPage from "./components/IntroPage/index.tsx";
import Technologies from "./components/Technologies/index.tsx";
import Experience from "./components/Experience/index.tsx";
import Projects from "./components/Projects/index.tsx";
import Contact from "./components/Contact/index.tsx";
import Blogs from "./components/Blogs/index.tsx";

if (process.env.NODE_ENV === "development") {
  setupLocatorUI();
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Navigate to="/" replace />,
    children: [
      {
        index: true,
        element: <Navigate to="/" />,
      },
      {
        path: "/about",
        element: <IntroPage />,
      },
      {
        path: "/technologies",
        element: <Technologies />,
      },
      {
        path: "/experience",
        element: <Experience />,
      },
      {
        path: "/projects",
        element: <Projects />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/blogs",
        element: <Blogs />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
