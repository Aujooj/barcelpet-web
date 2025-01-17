import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Product from "../interfaces/Product";

const AliveAnimals: React.FC = () => {
  const [animals, setAnimals] = useState<Product[]>([]);
  const { animalType } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/info/animals/${animalType}`)
      .then((res) => res.json())
      .then((data) => setAnimals(data));
  }, [animalType]);

  return (
    <>
      <Header />
      <div className="flex flex-col mt-20 bg-gray-100">
        <div className="bg-secondary text-white py-8 text-center">
          <h1 className="text-4xl font-bold">{`${
            animalType == "peixe"
              ? "Peixes"
              : animalType == "reptil"
              ? "Répteis"
              : "Erro"
          }`}</h1>
          <p className="text-lg">
            Conheça os nossos animais disponíveis para venda.
          </p>
        </div>

        <section className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-8">
            {animals.map((animal) => (
              <div
                key={animal.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-72 object-contain"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {animal.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AliveAnimals;
