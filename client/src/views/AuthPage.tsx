import React, { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthPage: React.FC = () => {
  const { token, setToken, setUser } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone:"",
    email: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
    window.scrollTo(0, 0);
  }, [token, navigate]);

  const toggleForm = () => {
    setIsRegister((prev) => !prev);
    setError(null);
    setSuccess(null);
    setFormData({ name: "", surname: "", phone:"", email: "", password: "" });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister && !validatePassword(formData.password)) {
      setError(
        "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial."
      );
      return;
    }

    const apiUrl = isRegister
      ? "http://localhost:3000/api/auth/register"
      : "http://localhost:3000/api/auth/login";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      } else if (!isRegister) {
        setToken(data.token);
        setUser(data.user);
        navigate("/dashboard");
      }
      setError(null);
      setSuccess(data.message);
      setFormData({ name: "", surname: "", phone:"", email: "", password: "" });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
        setError(err.message || "An unexpected error occurred.");
      } else {
        console.error("Unknown error:", err);
        setError("An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-primary mb-6">
          {isRegister ? "Criar Conta" : "Inicie sessão"}
        </h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mb-4">{success}</p>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isRegister && (
            <div className="grid grid-cols-1 gap-4">
              {["name", "surname", "phone"].map((field) => (
                <div key={field} className="relative">
                  <input
                    type="text"
                    name={field}
                    value={formData[field as keyof typeof formData]}
                    onChange={handleInputChange}
                    required
                    className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                  <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all">
                    {field === "name" ? "Nome" : field === "surname" ? "Apelido" : "Telefone"}
                  </label>
                </div>
              ))}
            </div>
          )}

          <div className="relative">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all">
              Email
            </label>
          </div>

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
              className="peer w-full px-4 pt-6 pb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary pr-10"
            />
            <label className="absolute left-4 top-2 text-gray-500 text-sm transition-all">
              Palavra-passe
            </label>
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-secondary transition"
          >
            {isRegister ? "GUARDAR" : "ENTRAR"}
          </button>
        </form>

        <p className="text-center mt-4">
          {isRegister ? "Já tem uma conta?" : "Não tem uma conta?"}
          <button
            type="button"
            className="text-primary ml-2 no-underline hover:text-secondary transition"
            onClick={toggleForm}
          >
            {isRegister ? "Inicie sessão!" : "Crie uma aqui."}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
