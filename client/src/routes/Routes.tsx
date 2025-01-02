import { createBrowserRouter } from "react-router-dom";
import {
  AboutUs,
  AliveType,
  App,
  FoodType,
  Home,
  Loader,
  Services,
} from "../views/AllViews";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      {
        path: "alimentacao",
        element: <Loader />,
        children: [
          { path: "", element: <FoodType /> },
          { path: "cao", element: <></> },
          { path: "gato", element: <></> },
        ],
      },
      {
        path: "vivos",
        element: <Loader />,
        children: [
          { path: "", element: <AliveType /> },
          { path: "peixe", element: <></> },
          { path: "reptil", element: <></> },
        ],
      },
      { path: "servicos", element: <Services /> },
      { path: "sobre", element: <AboutUs /> },
    ],
  },
]);
