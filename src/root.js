import {
  createRouter,
  createRoute,
  createRootRoute,
} from "@tanstack/react-router";
import Homepage from "./pages/Home";
import Makepage from "./pages/Make";
import Loginpage from "./pages/Login";
import Myvenuespage from "./pages/Myvenues";
import Registerpage from "./pages/Register";
import Venuepage from "./pages/Venue";
import Venuespage from "./pages/Venues";
import Profilepage from "./pages/Profile";
import Root from "./App";

const rootRoute = new createRootRoute({
  component: Root,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Homepage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Loginpage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: Registerpage,
});

const venueRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/venue",
  component: Venuepage,
});

const venuesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/venues",
  component: Venuespage,
});

const makeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/create",
  component: Makepage,
});

const ProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profile",
  component: Profilepage,
});

const MyVenuesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/myvenues",
  component: Myvenuespage,
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  venuesRoute,
  venueRoute,
  registerRoute,
  makeRoute,
  ProfileRoute,
  MyVenuesRoute,
]);

export const router = createRouter({ routeTree });

export default router;
