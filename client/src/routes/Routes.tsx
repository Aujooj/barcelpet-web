import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../views/Home";
import AboutUs from "../views/AboutUs";
import Services from "../views/Services";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "servicos", element: <Services /> },
      { path: "sobre", element: <AboutUs /> },
    ],
  },
]);