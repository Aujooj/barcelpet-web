import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <section
        className="relative bg-cover bg-center bg-no-repeat h-screen flex items-center justify-center"
        style={{ backgroundImage: `url('/assets/hero.jpg')` }}
      >
        <div className="container mx-auto px-6 text-white mt-[-20%]">
          <h1
            className="text-5xl font-bold mb-4"
            style={{ textShadow: ` 1px 1px 2px black` }}
          >
            Barcelpet
          </h1>
          <p
            className="text-lg mb-6 drop-shadow-2xl"
            style={{ textShadow: ` 1px 1px 2px black` }}
          >
            AQUI SOMOS FAMÍLIA!
          </p>
          <Link
            to="https://buk.pt/barcelpet"
            className="btn bg-secondary text-white px-6 py-3 rounded-md hover:bg-secondary/90 transition"
          >
            Como podemos ajudar?
          </Link>
        </div>
      </section>
      <section className="pet-care-tips py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Dicas de Cuidados para Animais de Estimação
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="tip bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">
                Dica 1: Alimentação Saudável
              </h3>
              <p className="text-gray-700">
                Escolha rações de alta qualidade e adequadas à idade e porte do
                seu animal.
              </p>
            </div>
            <div className="tip bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Dica 2: Hidratação</h3>
              <p className="text-gray-700">
                Garanta que seu pet tenha sempre água fresca e limpa disponível.
              </p>
            </div>
            <div className="tip bg-white shadow-md p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Dica 3: Exercícios</h3>
              <p className="text-gray-700">
                Leve seu animal para passear regularmente e proporcione
                atividades divertidas.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
