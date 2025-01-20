import React from "react";
import { CiLogout } from "react-icons/ci";
import { FaDog, FaHome, FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { FaFishFins, FaScissors } from "react-icons/fa6";
import { MdDashboard } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { distinctItemsCount } = useCart();

  return (
    <nav className="h-screen w-64 text-primary bg-gray-100 fixed top-0 left-0 flex flex-col justify-between">
      <div className="p-6 text-2xl font-bold items-center">
        <Link to="/dashboard">
          <img src="/innerLogo.png" alt="logo" className="h-20 m-auto" />
        </Link>
      </div>

      <ul className="space-y-4 flex-grow px-4">
        <li>
          <Link
            to="/dashboard"
            className="block py-2 px-4 rounded hover:bg-secondary hover:text-white transition"
          >
            <MdDashboard className="inline mr-2 w-5 h-5" />
            Painel
          </Link>
        </li>

        {user?.role === "admin" && (
          <>
            <li>
              <Link
                to="/dashboard/alimentacao"
                className="block py-2 px-4 rounded hover:bg-secondary hover:text-white transition"
              >
                <FaShoppingBag className="inline mr-2 w-5 h-5" />
                Alimentação
              </Link>
            </li>
            <li>
              <Link
                to="/dashboard/vivos"
                className="block py-2 px-4 rounded hover:bg-secondary hover:text-white transition"
              >
                <FaFishFins className="inline mr-2 w-5 h-5" />
                Animais Vivos
              </Link>
            </li>
            <li>
              <Link
                to="/services"
                className="block py-2 px-4 rounded hover:bg-secondary hover:text-white transition"
              >
                <FaScissors className="inline mr-2 w-5 h-5" />
                Serviços
              </Link>
            </li>
          </>
        )}

        <li>
          <Link
            to="/animals"
            className="block py-2 px-4 rounded hover:bg-secondary hover:text-white transition"
          >
            <FaDog className="inline mr-2 w-5 h-5" />
            {user?.role === "user" ? "Meus " : ""}Animais
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="block py-2 px-4 rounded hover:bg-secondary hover:text-white transition"
          >
            <FaHome className="inline mr-2 w-5 h-5" />
            Voltar ao site
          </Link>
        </li>
      </ul>

      <div className="pb-4">
        <ul className="space-y-4 flex-grow px-4">
          <li className="flex items-center justify-between mr-6">
            <Link
              to="/dashboard/definicoes"
              className="block py-2 px-4 rounded hover:bg-secondary hover:text-white transition items-center"
            >
              <FaUserCircle className="inline mr-2 w-5 h-5" />
              {user?.name}
            </Link>
            <Link to="/dashboard/carrinho">
              <div className="relative cursor-pointer">
                <FaShoppingCart className="w-5 h-5 text-primary hover:text-secondary transition" />
                {distinctItemsCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full h-4 w-4 flex items-center justify-center">
                    {distinctItemsCount}
                  </span>
                )}
              </div>
            </Link>
          </li>
          <li>
            <button
              onClick={logout}
              className="bg-gray-100 w-full block py-2 px-4 rounded hover:bg-secondary hover:text-white transition"
            >
              <CiLogout className="inline mr-2 w-5 h-5" />
              Sair
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
