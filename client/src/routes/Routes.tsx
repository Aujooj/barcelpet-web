import { createBrowserRouter } from "react-router-dom";
import {
  AboutUs,
  AliveAnimals,
  AliveFormPage,
  AliveType,
  App,
  AuthPage,
  BrandDetails,
  CartPage,
  Checkout,
  Dashboard,
  FoodBrand,
  FoodDetails,
  FoodFormPage,
  FoodType,
  Home,
  ListAlive,
  ListProduct,
  Loader,
  NotFoundPage,
  OrderSent,
  Services,
  UserFormPage,
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
        path: "dashboard/alimentacao/:id",
        element: (
          <ProtectedRoute>
            <FoodFormPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard/vivos/:id",
        element: (
          <ProtectedRoute>
            <AliveFormPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "dashboard",
        element: <Loader />,
        children: [
          {
            path: "",
            element: (
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "alimentacao",
            element: (
              <ProtectedRoute>
                <ListProduct />
              </ProtectedRoute>
            ),
          },
          {
            path: "vivos",
            element: (
              <ProtectedRoute>
                <ListAlive />
              </ProtectedRoute>
            ),
          },
          {
            path: "definicoes",
            element: (
              <ProtectedRoute>
                <UserFormPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "carrinho",
            element: (
              <ProtectedRoute>
                <CartPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "checkout",
            element: (
              <ProtectedRoute>
                <Checkout />
              </ProtectedRoute>
            ),
          },
          {
            path: "thank-you",
            element: (
              <ProtectedRoute>
                <OrderSent />
              </ProtectedRoute>
            ),
          },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
