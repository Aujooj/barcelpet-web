import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useParams } from "react-router-dom";

const FoodBrand: React.FC = () => {
  const [brands, setBrands] = useState([]);
  const { animalType } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/info/food/brands/${animalType}`)
      .then((res) => res.json())
      .then((data) => setBrands(data));
  }, [animalType]);

  return (
    <div className="min-h-screen flex flex-col mt-20 bg-gray-100">
      <Header />

      <section className="bg-secondary text-white py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">
          Nossas Marcas para{" "}
          {`${
            animalType == "cao"
              ? "Cães"
              : animalType == "gato"
              ? "Gatos"
              : "Erro"
          }`}
        </h1>
        <p className="text-lg">Confira as melhores opções para seu pet!</p>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {brands.map((brand, index) => (
              <Link to={`/alimentacao/${animalType}/${brand}`} className="block">
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden p-6 hover:scale-105 transform transition-transform duration-300"
                >
                  <h3 className="text-xl font-semibold text-primary text-center mb-2">
                    {brand}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};
export default FoodBrand;
