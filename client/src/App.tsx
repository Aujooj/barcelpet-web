import { Outlet } from "react-router";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <>
    <AuthProvider>
      <Outlet />
    </AuthProvider>
    </>
  );
}

export default App;
