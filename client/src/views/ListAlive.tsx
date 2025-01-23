import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import Product from "../interfaces/Product";
import Loading from "../components/Loading";
import { FaSortDown, FaSortUp, FaTrashAlt } from "react-icons/fa";

const ListAlive: React.FC = () => {
  const navigate = useNavigate();
  const [animals, setAnimals] = useState<Product[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: "asc" | "desc";
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/info/alive`)
      .then((res) => res.json())
      .then((data) => {
        setAnimals(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    window.scrollTo(0, 0);
  }, []);

  const handleSort = (key: keyof Product) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig?.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const sortedAnimals = React.useMemo(() => {
    if (!sortConfig) return animals;
    return [...animals].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [animals, sortConfig]);

  const getSortIcon = (key: keyof Product) => {
    if (sortConfig?.key === key) {
      return sortConfig.direction === "asc" ? <FaSortUp /> : <FaSortDown />;
    }
    return null;
  };

  const handleAdd = () => {
    navigate("adicionar");
  };

  const handleEdit = (id: number) => {
    navigate(`${id}`);
  };

  const handleRemove = async (id: number) => {
    const confirmRemove = window.confirm(
      "Tem a certeza de que pretende remover este item?"
    );
    if (confirmRemove) {
      try {
        const response = await fetch(
          "http://localhost:3000/api/remove/product",
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),
          }
        );
        const data = await response.json();
        if (!response.ok) throw new Error(data.message);
        else {
          alert("Animal deletado com sucesso!");
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
          <h1 className="text-4xl font-bold text-center mb-10">
            Todos de Animais Vivos
          </h1>
          <button
            className="self-center mb-6 px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition"
            onClick={handleAdd}
          >
            Adicionar
          </button>
          {loading ? (
            <Loading />
          ) : sortedAnimals.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              Não existem animais cadastrados.
            </p>
          ) : (
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2"></th>
                  <th className="border p-2">Imagem</th>
                  <th
                    className="border p-2 cursor-pointer"
                    onClick={() => handleSort("name")}
                  >
                    Nome {getSortIcon("name")}
                  </th>
                  <th
                    className="border p-2 cursor-pointer"
                    onClick={() => handleSort("type")}
                  >
                    Tipo {getSortIcon("type")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedAnimals.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td
                      className="border p-4 cursor-pointer"
                      onClick={() => handleRemove(product.id)}
                    >
                      <FaTrashAlt />
                    </td>
                    <td className="border p-2 text-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-16 w-16 object-co mx-auto"
                      />
                    </td>
                    <td
                      className="border p-2 overflow-hidden overflow-ellipsis max-h-24 cursor-pointer"
                      onClick={() => handleEdit(product.id)}
                    >
                      {product.name}
                    </td>
                    <td className="border p-2">
                      {product.type == "peixe" ? "Peixe" : "Réptil"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};
export default ListAlive;
