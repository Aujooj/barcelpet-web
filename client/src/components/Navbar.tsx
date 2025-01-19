import React from "react";
import { CiLogout } from "react-icons/ci";
import { FaDog, FaHome, FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { FaFishFins, FaScissors } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { MdDashboard } from "react-icons/md";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();

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
            <MdDashboard className="inline mr-2"/>Painel
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/alimentacao"
            className="block py-2 px-4 rounded hover:bg-secondary hover:text-white transition"
          >
            <FaShoppingBag className="inline mr-2"/>Alimentação
          </Link>
        </li>
        <li>
          <Link
            to="/dashboard/vivos"
            className="block py-2 px-4 rounded hover:bg-secondary hover:text-white transition"
          >
            <FaFishFins className="inline mr-2"/>Animais Vivos
          </Link>
        </li>
        <li>
          <Link
            to="/services"
            className="block py-2 px-4 rounded hover:bg-secondary hover:text-white transition"
          >
            <FaScissors className="inline mr-2"/>Serviços
          </Link>
        </li>
        <li>
          <Link
            to="/animals"
            className="block py-2 px-4 rounded hover:bg-secondary hover:text-white transition"
          >
            <FaDog className="inline mr-2"/>Animais
          </Link>
        </li>
        <li>
          <Link
            to="/"
            className="block py-2 px-4 rounded hover:bg-secondary hover:text-white transition"
          >
            <FaHome className="inline mr-2"/>Voltar ao site
          </Link>
        </li>
      </ul>

      <div className="pb-4">
        <ul className="space-y-4 flex-grow px-4">
          <li>
            <Link
              to="/settings"
              className="block py-2 px-4 rounded hover:bg-secondary hover:text-white transition"
            >
              <FaUserCircle className="inline mr-2" />{user?.name}
            </Link>
          </li>
          <li>
            <button
            onClick={logout}
              className="bg-gray-100 w-full block py-2 px-4 rounded hover:bg-secondary hover:text-white transition"
            >
              <CiLogout className="inline mr-2" />Sair
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
