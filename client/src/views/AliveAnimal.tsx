import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Animal = {
  id: number;
  name: string;
  type: string;
  image: string;
};

const AliveAnimals: React.FC = () => {
  const currentUrl = window.location.href;
  const urlArray = currentUrl.split("/");
  
  const [animals, setAnimals] = useState<Animal[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3000/info/animals/${urlArray[4]}`)
      .then((res) => res.json())
      .then((data) => setAnimals(data));
  }, [currentUrl]);

  return (
    <>
      <Header />
      <div className="flex flex-col mt-20">
        <div className="bg-primary text-white py-8 text-center">
          <h1 className="text-4xl font-bold">{`${urlArray[4] == "peixe" ? "Peixes" : urlArray[4] == "reptil" ? "Répteis" : "Erro"}`}</h1>
          <p className="text-lg">
            Conheça os nossos animais disponíveis para venda.
          </p>
        </div>

        <section className="container mx-auto px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {animals.map((animal) => (
              <div
                key={animal.id}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={animal.image}
                  alt={animal.name}
                  className="w-full h-72 object-fit"
                />
                <div className="p-6">
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
