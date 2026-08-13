import { createBrowserRouter, RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";

import Root from "./pages/Root";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

import { tokenLoader, checkAuthLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    id: "root",
    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "events",
        element: <Events />,
        loader: checkAuthLoader,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
