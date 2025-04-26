
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

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error('Root element not found');
ReactDOM.createRoot(rootElement).render(
  <RouterProvider router={router} />
);
