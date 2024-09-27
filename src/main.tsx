// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TypePage from "./pages/TypePage";
import "./app/styles/index.css";
import "./app/styles/global.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TypePage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
    <RouterProvider router={router} />
  // </StrictMode>
);
