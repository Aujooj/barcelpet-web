import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { Outlet } from "react-router";

function App() {
  return (
    <>
      <AuthProvider>
        <CartProvider>
          <Outlet />
        </CartProvider>
      </AuthProvider>
    </>
  );
}

export default App;
