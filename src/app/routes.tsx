import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import Figures from "./pages/Figures";
import Album from "./pages/Album";
import Social from "./pages/Social";
import ChallengeCamera from "./pages/ChallengeCamera";
import PhotoEditor from "./pages/PhotoEditor";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminFigures from "./pages/AdminFigures";
import AdminPostSocial from "./pages/AdminPostSocial";
import Rankings from "./pages/Rankings";
import Podium from "./pages/Podium";
import { Navigate } from "react-router";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/figures",
    Component: Figures,
  },
  {
    path: "/album",
    Component: Album,
  },
  {
    path: "/social",
    Component: Social,
  },
  {
    path: "/challenge/:type",
    Component: ChallengeCamera,
  },
  {
    path: "/editor",
    Component: PhotoEditor,
  },
  {
    path: "/admin",
    Component: AdminLogin,
  },
  {
    path: "/admin/login",
    Component: AdminLogin,
  },
  {
    path: "/admin/dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/admin/postsocial",
    Component: AdminPostSocial,
  },
  {
    path: "/admin/figures",
    Component: AdminFigures,
  },
  {
    path: "/rankings",
    Component: Rankings,
  },
  {
    path: "/podium",
    Component: Podium,
  },
]);