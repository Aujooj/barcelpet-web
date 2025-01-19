import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AliveType: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col mt-20 bg-gray-100">
        <div className="content-margin mx-auto max-w-7xl px-4 py-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Qual animal?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/vivos/peixe" className="group">
              <div className="card-pressable bg-white p-5 shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                <img
                  src="/assets/fish.png"
                  alt="Imagem de peixe"
                  className="card-pressable-image w-full h-72 object-fit"
                />
                <h3 className="card-pressable-title text-xl font-medium text-gray-800 text-center py-4">
                  Peixe
                </h3>
              </div>
            </Link>

            <Link to="/vivos/reptil" className="group">
              <div className="card-pressable bg-white p-5 shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                <img
                  src="/assets/turtle.png"
                  alt="Imagem de reptil"
                  className="card-pressable-image w-full h-72 object-fit"
                />
                <h3 className="card-pressable-title text-xl font-medium text-gray-800 text-center py-4">
                  Reptil
                </h3>
              </div>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AliveType;
