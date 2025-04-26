
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import './index.css';
import HomeLayout from './Layout/HomeLayout'

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
  },
]);

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <RouterProvider router={router} />
);
