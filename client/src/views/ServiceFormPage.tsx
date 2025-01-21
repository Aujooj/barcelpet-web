import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import { IoIosArrowRoundBack } from "react-icons/io";
import Service from "../interfaces/Service.tsx";
import ServiceCategory from "../interfaces/ServiceCategory.tsx";

const ServiceFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isAdd = id === "adicionar";
  const [formData, setFormData] = useState<Service>({
    id: 0,
    category: { id: 0, title: "", description: "", image: "" },
    categoryId: 1,
    petType: "",
    minWeight: 0,
    maxWeight: 0,
    price: 0,
    duration: 0,
  });
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch available categories
    fetch("http://localhost:3000/info/serviceCategories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err));

    // Fetch service data if editing
    if (!isAdd) {
      fetch(`http://localhost:3000/info/services/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData(data);
        })
        .catch((err) => console.error("Failed to fetch service data:", err));
    }

    window.scrollTo(0, 0);
  }, [id, isAdd]);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]:
        name === "categoryId" || name === "duration"
          ? parseInt(value, 10)
          : name === "price" || name === "minWeight" || name === "maxWeight"
          ? parseFloat(value)
          : value,
    });
    console.log(formData.categoryId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedFormData = isAdd ? { ...formData, id: undefined } : formData;

    const method = isAdd ? "POST" : "PUT";
    const url = isAdd
      ? "http://localhost:3000/api/create/service"
      : "http://localhost:3000/api/update/service";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    });

    if (response.ok) {
      alert(`Serviço ${isAdd ? "adicionado" : "alterado"} com sucesso!`);
      handleGoBack();
    } else {
      alert(`Falha ao ${isAdd ? "adicionar" : "alterar"} serviço.`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen ml-64 p-10 flex flex-col bg-gray-100">
        <div className="overflow-x-auto mx-6 p-8 bg-white shadow-lg rounded-lg">
          <div className="flex items-center justify-between mb-5 w-full">
            <IoIosArrowRoundBack
              className="w-12 h-12 cursor-pointer text-primary hover:text-secondary"
              onClick={handleGoBack}
            />
            <h1 className="text-2xl font-bold">
              {isAdd ? "Adicionar" : "Alterar"} Serviço
            </h1>
            <button
              type="submit"
              onClick={handleSubmit}
              className="p-2 w-40 bg-primary text-white rounded hover:bg-secondary"
            >
              {isAdd ? "ENVIAR" : "ATUALIZAR"}
            </button>
          </div>
          <form className="flex flex-col space-y-4">
            <label>Categoria*</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Escolha uma categoria
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            <label>Tipo de Animal*</label>
            <select
              name="petType"
              value={formData.petType}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            >
              <option value="" disabled>
                Escolha
              </option>
              <option value="cao">Cão</option>
              <option value="gato">Gato</option>
            </select>
            <label>Peso Mínimo (kg)*</label>
            <input
              type="number"
              name="minWeight"
              value={formData.minWeight}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <label>Peso Máximo (kg)*</label>
            <input
              type="number"
              name="maxWeight"
              value={formData.maxWeight}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <label>Preço*</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <label>Duração*</label>
            <input
              type="text"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <p>(*) Campos obrigatórios</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ServiceFormPage;
