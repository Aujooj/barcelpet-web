import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useAuth } from "../context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const UserFormPage: React.FC = () => {
  const { user, setUser } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // For toggling visibility of confirm password
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    id: 0,
    name: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    postal_code: "",
    role: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        password: "",
        confirmPassword: "",
        address: user.address,
        city: user.city,
        postal_code: user.postal_code,
        role: user.role,
      });
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password: string): boolean => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem.");
      return;
    }

    // Validate password
    if (!validatePassword(formData.password)) {
      setError(
        "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um caractere especial."
      );
      return;
    }

    const response = await fetch(
      `http://localhost:3000/api/users/update/${user?.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );

    if (response.ok) {
      setUser(formData);
      alert("User updated successfully!");
      navigate("/dashboard");
    } else {
      alert("Failed to update user.");
      console.log(response);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen ml-64 p-10 flex flex-col bg-gray-100">
        <div className="overflow-x-auto mx-6 p-8 bg-white shadow-lg rounded-lg">
          <div className="flex items-center justify-between mb-5 w-full">
            <IoIosArrowRoundBack
              className="w-12 h-12 cursor-pointer text-primary hover:text-secondary"
              onClick={() => navigate(-1)}
            />
            <h1 className="text-2xl font-bold">Atualizar Utilizador</h1>
            <button
              type="submit"
              onClick={handleSubmit}
              className="p-2 w-40 bg-primary text-white rounded hover:bg-secondary"
            >
              SALVAR
            </button>
          </div>
          <form className="flex flex-col space-y-4">
            <label>Nome*</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <label>Email*</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <label>Telefone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <div className="relative">
              <label htmlFor="password">Palavra-passe*</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="p-2 border border-gray-300 rounded w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <div className="relative">
              <label htmlFor="confirmPassword">Confirmar Palavra-passe*</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  className="p-2 border border-gray-300 rounded w-full"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
                >
                  {showConfirmPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            {/* Error message (if any) */}
            {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
            <label>Endereço</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <label>Cidade</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <label>Código Postal</label>
            <input
              type="text"
              name="postal_code"
              value={formData.postal_code}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <p>(*) Campos Obrigatórios</p>
            <p>{formData.role}</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default UserFormPage;
