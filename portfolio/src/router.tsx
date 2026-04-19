import { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./App";
import NotFoundPage from "./pages/NotFound";
import RouteErrorPage from "./pages/RouteErrorPage";

const HomePage = lazy(() => import("./pages/Home"));
const ExperiencePage = lazy(() => import("./pages/Experience"));
const ProjectsPage = lazy(() => import("./pages/Projects"));
const ProjectDetailPage = lazy(() => import("./pages/ProjectDetail"));
const BlogsPage = lazy(() => import("./pages/Blogs"));
const BlogDetailPage = lazy(() => import("./pages/BlogDetail"));
const ContactPage = lazy(() => import("./pages/Contact"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <RouteErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "home",
        element: <Navigate to="/#about" replace />,
      },
      {
        path: "about",
        element: <Navigate to="/#about" replace />,
      },
      {
        path: "experience",
        element: <ExperiencePage />,
      },
      {
        path: "work",
        element: <Navigate to="/experience" replace />,
      },
      {
        path: "projects",
        children: [
          {
            index: true,
            element: <ProjectsPage />,
          },
          {
            path: ":slug",
            element: <ProjectDetailPage />,
          },
        ],
      },
      {
        path: "blogs",
        children: [
          {
            index: true,
            element: <BlogsPage />,
          },
          {
            path: ":slug",
            element: <BlogDetailPage />,
          },
        ],
      },
      {
        path: "contact",
        element: <ContactPage />,
      },
      {
        path: "not-found",
        element: <NotFoundPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
