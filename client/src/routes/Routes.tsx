import { createBrowserRouter } from "react-router-dom";
import {
  AboutUs,
  AliveAnimals,
  AliveType,
  App,
  AuthPage,
  BrandDetails,
  Dashboard,
  FoodBrand,
  FoodDetails,
  FoodType,
  Home,
  Loader,
  NotFoundPage,
  Services,
} from "../views/AllViews";
import { ProtectedRoute } from "../components/ProtectedRoute";

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
          { path: ":animalType", element: <FoodBrand /> },
          { path: ":animalType/:brandId", element: <BrandDetails /> },
          { path: ":animalType/:brandId/:foodId", element: <FoodDetails /> },
        ],
      },
      {
        path: "vivos",
        element: <Loader />,
        children: [
          { path: "", element: <AliveType /> },
          { path: ":animalType", element: <AliveAnimals /> },
        ],
      },
      { path: "servicos", element: <Services /> },
      { path: "sobre", element: <AboutUs /> },
      { path: "login", element: <AuthPage /> },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
