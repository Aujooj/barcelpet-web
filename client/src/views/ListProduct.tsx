import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar.tsx";
import { FaSortDown, FaSortUp, FaTrashAlt } from "react-icons/fa";
import Product from "../interfaces/Product.tsx";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading.tsx";

const ListProduct: React.FC = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState<Product[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product;
    direction: "asc" | "desc";
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/info/food`)
      .then((res) => res.json())
      .then((data) => {
        setFoods(data);
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

  const sortedFoods = React.useMemo(() => {
    if (!sortConfig) return foods;
    return [...foods].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) return sortConfig.direction === "asc" ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [foods, sortConfig]);

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
          alert("Ração deletada com sucesso!");
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
            Todos os Produtos
          </h1>
          <button
            className="self-center mb-6 px-4 py-2 bg-primary text-white rounded hover:bg-secondary transition"
            onClick={handleAdd}
          >
            Adicionar
          </button>
          {loading ? (
            <Loading />
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
                    onClick={() => handleSort("brand")}
                  >
                    Marca {getSortIcon("brand")}
                  </th>

                  <th className="border p-2">Preço</th>
                  <th className="border p-2">Qtd. Estoque</th>
                  <th className="border p-2">Peso</th>
                  <th
                    className="border p-2 cursor-pointer"
                    onClick={() => handleSort("type")}
                  >
                    Tipo {getSortIcon("type")}
                  </th>
                  <th className="border p-2">Características</th>
                  <th className="border p-2">Benefícios</th>
                  <th className="border p-2">Composição</th>
                  <th className="border p-2">Analíticos</th>
                  <th className="border p-2">Aditivos Adicionais</th>
                  <th className="border p-2">Aditivos Tecnológicos</th>
                </tr>
              </thead>
              <tbody>
                {sortedFoods.map((product) => (
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
                    <td className="border p-2">{product.brand}</td>
                    <td className="border p-2">{`${product.price}€`}</td>
                    <td className="border p-2">{product.stock}</td>
                    <td className="border p-2">{product.weight}</td>
                    <td className="border p-2">
                      {product.type == "cao" ? "Cão" : "Gato"}
                    </td>
                    <td className="border p-2 overflow-hidden overflow-ellipsis max-h-24">
                      <div className="line-clamp-5">
                        {product.features != null
                          ? product.features
                              .split("<br>")
                              .map((line, index) => (
                                <p key={index} className="text-gray-700">
                                  {line}
                                </p>
                              ))
                          : " "}
                      </div>
                    </td>
                    <td className="border p-2 overflow-hidden overflow-ellipsis max-h-24">
                      <div className="line-clamp-5">
                        {product.benefits != null
                          ? product.benefits
                              .split("<br>")
                              .map((line, index) => (
                                <p key={index} className="text-gray-700">
                                  {line}
                                </p>
                              ))
                          : " "}
                      </div>
                    </td>
                    <td className="border p-2 overflow-hidden overflow-ellipsis max-h-24">
                      <div className="line-clamp-5">{product.composition}</div>
                    </td>
                    <td className="border p-2 overflow-hidden overflow-ellipsis max-h-24">
                      <div className="line-clamp-5">{product.analytical}</div>
                    </td>
                    <td className="border p-2 overflow-hidden overflow-ellipsis max-h-24">
                      <div className="line-clamp-5">
                        {product.additional_additives}
                      </div>
                    </td>
                    <td className="border p-2 overflow-hidden overflow-ellipsis max-h-24">
                      <div className="line-clamp-5">
                        {product.technological_additives}
                      </div>
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

export default ListProduct;
