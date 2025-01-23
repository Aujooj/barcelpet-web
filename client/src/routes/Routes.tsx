import { createBrowserRouter } from "react-router-dom";
import {
  AboutUs,
  AddAppointment,
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
  AppointmentArchive,
} from "../views/AllViews";
import { ProtectedRoute } from "../components/ProtectedRoute";
import AppointmentDashboard from "../views/AppointmentDashboard";
import AdminOnly from "../views/AdminOnly";

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
              <AdminOnly>
                <ListProduct />
              </AdminOnly>
            ),
          },
          {
            path: "alimentacao/:id",
            element: (
              <AdminOnly>
                <FoodFormPage />
              </AdminOnly>
            ),
          },
          {
            path: "vivos",
            element: (
              <AdminOnly>
                <ListAlive />
              </AdminOnly>
            ),
          },
          {
            path: "vivos/:id",
            element: (
              <AdminOnly>
                <AliveFormPage />
              </AdminOnly>
            ),
          },
          {
            path: "servicos",
            element: (
              <AdminOnly>
                <ListServices />
              </AdminOnly>
            ),
          },
          {
            path: "servicos/:id",
            element: (
              <AdminOnly>
                <ServiceFormPage />
              </AdminOnly>
            ),
          },
          {
            path: "servicoscategoria/:id",
            element: (
              <AdminOnly>
                <ServiceCategoryFormPage />
              </AdminOnly>
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
            path: "marcacoes/adicionar",
            element: (
              <ProtectedRoute>
                <AddAppointment />
              </ProtectedRoute>
            ),
          },
          {
            path: "marcacoes/arquivo",
            element: (
              <ProtectedRoute>
                <AppointmentArchive />
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
