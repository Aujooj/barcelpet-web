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
  OrdersDashboard,
  ListServices,
  ServiceCategoryFormPage,
  ServiceFormPage,
} from "../views/AllViews";
import { ProtectedRoute } from "../components/ProtectedRoute";
import AppointmentDashboard from "../views/AppointmentDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <Home /> },
      { path: "sobre", element: <AboutUs /> },
      { path: "login", element: <AuthPage /> },
      { path: "servicos", element: <Services /> },
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
            path: "alimentacao/:id",
            element: (
              <ProtectedRoute>
                <FoodFormPage />
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
            path: "vivos/:id",
            element: (
              <ProtectedRoute>
                <AliveFormPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "servicos",
            element: (
              <ProtectedRoute>
                <ListServices />
              </ProtectedRoute>
            ),
          },
          {
            path: "servicos/:id",
            element: (
              <ProtectedRoute>
                <ServiceFormPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "servicoscategoria/:id",
            element: (
              <ProtectedRoute>
                <ServiceCategoryFormPage />
              </ProtectedRoute>
            ),
          },
          {
            path: "marcacoes",
            element: (
              <ProtectedRoute>
                <AppointmentDashboard />
              </ProtectedRoute>
            ),
          },
          {
            path: "pedidos",
            element: (
              <ProtectedRoute>
                <OrdersDashboard />
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
