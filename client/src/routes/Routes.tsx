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
import AliveAnimals from "../views/AliveAnimal";

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
          { path: "peixe", element:  <AliveAnimals />},
          { path: "reptil", element: <AliveAnimals /> },
        ],
      },
      { path: "servicos", element: <Services /> },
      { path: "sobre", element: <AboutUs /> },
    ],
  },
]);
