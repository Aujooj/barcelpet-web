import React from "react";
import { Link } from "react-router-dom";

const PageNotFound: React.FC = () => {
  const pets = ["Garfield", "Teddy"];
    return (
    <div className=" flex flex-col items-center justify-center bg-gray-100 text-center">
      <h2 className="text-3xl font-semibold text-secondary mt-14">Ops! Página Não Encontrada</h2>
      <p className="text-lg text-gray-700 mt-2">
      {`Parece que o ${pets[Math.floor(Math.random() * 2)]} fugiu com a página que procuras!`}
      </p>
      <Link
        to="/"
        className="mt-6 mb-10 px-6 py-3 bg-primary text-white font-medium rounded-full shadow-md hover:bg-secondary transition duration-300"
      >
        Voltar ao Início
      </Link>
    </div>
  );
};
export default PageNotFound;
