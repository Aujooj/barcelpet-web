import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

const FoodType: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col mt-20">
        <div className="content-margin mx-auto max-w-7xl px-4 py-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            Qual animal?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link to="/alimentacao/cao" className="group">
              <div className="card-pressable bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                <img
                  src="/assets/animals/dog.png"
                  alt="Imagem de cão"
                  className="card-pressable-image w-full h-72 object-fit"
                />
                <h3 className="card-pressable-title text-xl font-medium text-gray-800 text-center py-4">
                  Cão
                </h3>
              </div>
            </Link>

            <Link to="/alimentacao/gato" className="group">
              <div className="card-pressable bg-white shadow-lg rounded-lg overflow-hidden transform transition-transform hover:scale-105">
                <img
                  src="/assets/animals/cat.png"
                  alt="Imagem de gato"
                  className="card-pressable-image w-full h-72 object-fit"
                />
                <h3 className="card-pressable-title text-xl font-medium text-gray-800 text-center py-4">
                  Gato
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

export default FoodType;
