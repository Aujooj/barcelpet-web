import { Link, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Product from "../interfaces/Product";
import Loading from "../components/Loading";

const AliveAnimals: React.FC = () => {
  const [animals, setAnimals] = useState<Product[]>([]);
  const { animalType } = useParams();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch(`http://localhost:3000/info/animals/${animalType}`)
      .then((res) => res.json())
      .then((data) => {
        setAnimals(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    window.scrollTo(0, 0);
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
        {animalType === "reptil" ? (
          <div className="py-8 text-center">
            <p>
              De acordo com a Lei n.º 95/2017 de 23 de agosto, não é permitida a
              venda e/ou publicitação de animais selvagens/exóticos através de
              websites/plataformas na internet.
              <br />
              Caso deseje conhecer os animais que temos disponíveis e respetivas
              condições de venda, por favor entre em contacto connosco.
            </p>
          </div>
        ) : (
          ""
        )}
        <section className="container mx-auto px-6 py-12">
          {loading ? (
            <Loading />
          ) : (
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
          )}
        </section>
        <section className="bg-primary text-white py-6">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Está interessado em um deles?
            </h2>
            <p className="text-lg mb-6">
              Entre em contacto conosco para mais informações.
            </p>
            <Link
              to="/sobre#form-email"
              className="bg-white text-primary px-6 py-3 rounded-md hover:bg-gray-100 transition"
            >
              Entrar em contacto
            </Link>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default AliveAnimals;
