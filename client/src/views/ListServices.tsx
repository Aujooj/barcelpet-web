import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.tsx";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading.tsx";
import ServiceCategory from "../interfaces/ServiceCategory.tsx";
import Service from "../interfaces/Service.tsx";

const ListService: React.FC = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:3000/info/serviceCategories")
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    fetch("http://localhost:3000/info/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    window.scrollTo(0, 0);
  }, []);

  const handleAdd = (type: "servico" | "categoria") => {
    navigate(`/dashboard/servicos${type === "servico" ? "" : type}/adicionar`);
  };

  const handleEdit = (id: number, type: "servico" | "categoria") => {
    navigate(`/dashboard/servicos${type === "servico" ? "" : type}/${id}`);
  };

  const handleRemove = async (id: number, type: "servico" | "categoria") => {
    const confirmRemove = window.confirm(
      `Tem a certeza de que pretende remover este ${type}?`
    );
    if (confirmRemove) {
      try {
        const endpoint = `http://localhost:3000/api/remove/service${
          type === "servico" ? "" : "Category"
        }`;

        const response = await fetch(endpoint, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        else {
          alert(
            `${
              type === "servico" ? "Serviço removido" : "Categoria removida"
            } com sucesso!`
          );
          window.location.reload();
        }
      } catch (e) {
        alert(`Erro: ${e}`);
      }
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen ml-64 flex flex-col bg-gray-100">
        <div className="overflow-x-auto mx-6 p-8 bg-white shadow-lg rounded-lg my-10">
          <h1 className="text-4xl font-bold text-center mb-10">Serviços</h1>
          {loading ? (
            <Loading />
          ) : (
            <>
              <div className="flex items-center mb-4 gap-3">
                <h2 className="text-2xl font-semibold">Categorias de Serviço</h2>
                <button
                  className="flex items-center justify-center w-8 h-8 bg-primary text-white font-bold rounded-full hover:bg-secondary transition"
                  onClick={() => handleAdd("categoria")}
                >
                  +
                </button>
              </div>
              <table className="table-auto w-full border-collapse border border-gray-200 mb-10">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2"></th>
                    <th className="border p-2">Imagem</th>
                    <th className="border p-2">Título</th>
                    <th className="border p-2">Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category) => (
                    <tr key={category.id} className="hover:bg-gray-50">
                      <td
                        className="border p-4 cursor-pointer items-center"
                        onClick={() => handleRemove(category.id, "categoria")}
                      >
                        <FaTrashAlt />
                      </td>
                      <td className="border p-2 text-center">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="h-16 w-16 object-cover mx-auto"
                        />
                      </td>
                      <td
                        className="border p-2 cursor-pointer"
                        onClick={() => handleEdit(category.id, "categoria")}
                      >
                        {category.title}
                      </td>
                      <td className="border p-2">
                        {category.description
                          .split("<br>")
                          .map((line, index) => (
                            <p key={index} className="text-gray-700">
                              {line}
                            </p>
                          ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Services */}
              <div className="flex items-center mb-4 gap-3">
                <h2 className="text-2xl font-semibold">Serviços</h2>
                <button
                  className="flex items-center justify-center w-8 h-8 bg-primary text-white font-bold rounded-full hover:bg-secondary transition"
                  onClick={() => handleAdd("servico")}
                >
                  +
                </button>
              </div>
              <table className="table-auto w-full border-collapse border border-gray-200">
                <thead>
                  <tr className="bg-gray-100">
                    <th className="border p-2"></th>
                    <th className="border p-2 cursor-pointer">Categoria</th>
                    <th className="border p-2">Tipo de Pet</th>
                    <th className="border p-2">Peso Mínimo</th>
                    <th className="border p-2">Peso Máximo</th>
                    <th className="border p-2">Preço</th>
                    <th className="border p-2">Duração</th>
                  </tr>
                </thead>
                <tbody>
                  {services.map((service) => (
                    <tr key={service.id} className="hover:bg-gray-50">
                      <td
                        className="border p-4 cursor-pointer items-center"
                        onClick={() => handleRemove(service.id, "servico")}
                      >
                        <FaTrashAlt />
                      </td>
                      <td
                        className="border p-2 cursor-pointer"
                        onClick={() => handleEdit(service.id, "servico")}
                      >
                        {service.category.title}
                      </td>
                      <td className="border p-2">
                        {service.petType === "cao" ? "Cão" : "Gato"}
                      </td>
                      <td className="border p-2">{service.minWeight}</td>
                      <td className="border p-2">{service.maxWeight}</td>
                      <td className="border p-2">{`€${service.price}`}</td>
                      <td className="border p-2">{`${service.duration} min`}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ListService;
