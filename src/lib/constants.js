export const API_URL =
  import.meta.env.VITE_API_URL || "https://api.noroff.dev/api/v1/holidaze";
export const NAVIGATION = [
  { userMustBeLoggedIn: false, label: "Home", href: "/" },
  { userMustBeLoggedIn: true, label: "Venues", href: "/venues" },
  { userMustBeLoggedIn: true, label: "Register", href: "/register" },
  { userMustBeLoggedIn: true, label: "Sign out", href: "/signout" },
  { userMustBeLoggedIn: true, label: "Make", href: "/make" },
];
