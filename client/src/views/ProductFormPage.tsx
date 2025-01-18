import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import Product from "../interfaces/Product";
import { IoArrowBackCircleOutline } from "react-icons/io5";



const ProductFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isAdd = id === "adicionar";
  const [formData, setFormData] = useState<Product>({
    id: 0,
    name: "",
    price: 0,
    stock: 0,
    weight: "",
    type: "",
    image: "/logo.png",
    brand: "",
    features: "",
    benefits: "",
    composition: "",
    analytical: "",
    additional_additives: "",
    technological_additives: "",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdd) {
      fetch(`http://localhost:3000/info/food/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData({
            ...data,
            features: data.features?.replace(/<br\s*\/?>/gi, "\n"),
            benefits: data.benefits?.replace(/<br\s*\/?>/gi, "\n"),
            composition: data.composition?.replace(/<br\s*\/?>/gi, "\n"),
            analytical: data.analytical?.replace(/<br\s*\/?>/gi, "\n"),
            additional_additives: data.additional_additives?.replace(
              /<br\s*\/?>/gi,
              "\n"
            ),
            technological_additives: data.technological_additives?.replace(
              /<br\s*\/?>/gi,
              "\n"
            ),
          });
          setImagePreview(data.image);
        });
    }
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file.name });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const transformedData = {
      ...formData,
      features: formData.features.replace(/\n/g, "<br>"),
      benefits: formData.benefits.replace(/\n/g, "<br>"),
      composition: formData.composition.replace(/\n/g, "<br>"),
      analytical: formData.analytical.replace(/\n/g, "<br>"),
      additional_additives: formData.additional_additives.replace(/\n/g, "<br>"),
      technological_additives: formData.technological_additives.replace(/\n/g, "<br>"),
    };
    const method = isAdd ? "POST" : "PUT";
    const url = isAdd
      ? "http://localhost:3000/info/food"
      : `http://localhost:3000/info/food/${id}`;

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedData),
    });

    if (response.ok) {
      alert(`Produto ${isAdd ? "adicionado" : "alterado"} com sucesso!`);
    } else {
      alert(`Falha ao  ${id ? "adicionar" : "alterar"} produto.`);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen ml-64 p-10 flex flex-col bg-gray-100">
        <div className="flex items-center justify-between mb-5 w-full">
          <IoArrowBackCircleOutline
            className="w-12 h-12 cursor-pointer"
            onClick={handleGoBack}
          />
          <h1 className="text-2xl font-bold">
            {isAdd ? "Adicionar" : "Alterar"} Produto
          </h1>
          <button
            type="submit"
            className="p-2 w-40 bg-primary text-white rounded hover:bg-secondary"
          >
            {isAdd ? "ENVIAR" : "ATUALIZAR"}
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <label>Nome*</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
          <label>Quantidade em estoque*</label>
          <input
            type="number"
            name="quantity"
            value={formData.stock}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <label>Peso*</label>
          <input
            type="text"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <label>Tipo de animal*</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="p-1 border border-gray-300 rounded"
          >
            <option value="" defaultChecked disabled>
              Escolha
            </option>
            <option value="cao">Cão</option>
            <option value="gato">Gato</option>
          </select>
          <label>Imagem</label>
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 max-w-40" />
          )}
          <input type="file" onChange={handleImageChange} className="py-2" />
          <label>Marca</label>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <label>Características</label>
          <textarea
            name="features"
            value={formData.features}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <label>Benefícios</label>
          <textarea
            name="benefits"
            value={formData.benefits}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <label>Composição</label>
          <textarea
            name="composition"
            value={formData.composition}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <label>Componentes Analíticos</label>
          <textarea
            name="analytical"
            value={formData.analytical}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <label>Aditivos Adicionais</label>
          <textarea
            name="additional_additives"
            value={formData.additional_additives}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <label>Aditivos Tecnológicos</label>
          <textarea
            name="technological_additives"
            value={formData.technological_additives}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded"
          />
          <p>(*) Campos obrigatórios</p>
        </form>
      </div>
    </>
  );
};

export default ProductFormPage;
