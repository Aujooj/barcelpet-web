import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  const uri = window.location.pathname;

  const [isNavActive, setIsNavActive] = useState(false);

  const handleMenuToggle = () => {
    setIsNavActive(!isNavActive);
  };

  const handleCloseMenu = () => {
    setIsNavActive(false);
  };

  return (
    <header>
      <section
        id="header"
        className="fixed top-0 left-0 w-full bg-white/50 backdrop-blur-sm shadow-md z-50"
      >
        <div className="flex items-center justify-between px-6 py-4">
          <div className="logo">
            <Link to="/">
              <img src="/logo.png" alt="logo" className="h-12" />
            </Link>
          </div>
          <ul
            id="navbar"
            className={`fixed top-0 right-0 h-screen w-3/4 text-primary flex flex-col items-start gap-6 p-6 transform transition-transform duration-300 ease-in-out z-50 ${
              isNavActive ? "translate-x-0 bg-white/50" : "translate-x-full"
            } md:static md:flex md:flex-row md:gap-8 md:translate-x-0 md:h-auto md:w-auto md:p-0 md:z-auto`}
          >
            <li className="relative group text-lg font-medium">
              <Link
                to="/"
                className={`hover:text-secondary ${
                  uri === "/" ? "text-secondary font-bold" : ""
                }`}
              >
                Início
              </Link>
            </li>
            <li className="relative group text-lg font-medium">
              <Link
                to="/alimentacao"
                className={`hover:text-secondary ${
                  uri === "/alimentacao" ? "text-secondary font-bold" : ""
                }`}
              >
                Alimentação
              </Link>
              <ul className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out bg-white border border-gray-200 shadow-lg mt-2 rounded-md text-sm z-[60]">
                <li>
                  <Link
                    to="/alimentacao/cao"
                    className="block px-4 py-2 hover:bg-secondary hover:text-white"
                  >
                    Cão
                  </Link>
                </li>
                <li>
                <Link to="/alimentacao/gato"
                    className="block px-4 py-2 hover:bg-secondary hover:text-white"
                  >
                    Gato
                    </Link>
                </li>
              </ul>
            </li>
            <li className="relative group text-lg font-medium">
            <Link to="/vivos"
                className={`hover:text-secondary ${
                  uri === "/vivos" ? "text-secondary font-bold" : ""
                }`}
              >
                Vivos
                </Link>
              <ul className="absolute opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 ease-in-out bg-white border border-gray-200 shadow-lg mt-2 rounded-md text-sm">
                <li>
                <Link to="/vivos/peixe"
                    className="block px-4 py-2 hover:bg-secondary hover:text-white"
                  >
                    Peixes
                  </Link>
                </li>
                <li>
                <Link to="/vivos/reptil"
                    className="block px-4 py-2 hover:bg-secondary hover:text-white"
                  >
                    Répteis
                  </Link>
                </li>
              </ul>
            </li>
            <li className="relative group text-lg font-medium">
            <Link to="/servicos"
                className={`hover:text-secondary ${
                  uri === "/servicos" ? "text-secondary font-bold" : ""
                }`}
              >
                Serviços
              </Link>
            </li>
            <li className="relative group text-lg font-medium">
            <Link to="/sobre"
                className={`hover:text-secondary ${
                  uri === "/sobre" ? "text-secondary font-bold" : ""
                }`}
              >
                Quem somos?
              </Link>
            </li>
            <li>
              <Link to="https://buk.pt/barcelpet"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-secondary transition"
              >
                Agende já
              </Link>
            </li>
          </ul>
          <div id="mobile" className="md:hidden flex items-center">
            {!isNavActive && (
              <img
                id="bar"
                src="src/assets/hamburguerMenu.png"
                alt="menu"
                className="w-6 h-6 cursor-pointer"
                onClick={handleMenuToggle}
              />
            )}
            {isNavActive && (
              <img
                id="close"
                src="src/assets/close.png"
                alt="close menu"
                className="top-4 right-6 w-6 h-6 cursor-pointer z-[60]"
                onClick={handleCloseMenu}
              />
            )}
          </div>
        </div>
      </section>
    </header>
  );
};

export default Header;
