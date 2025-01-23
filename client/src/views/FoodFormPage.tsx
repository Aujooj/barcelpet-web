import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import Product from "../interfaces/Product.ts";
import { IoIosArrowRoundBack } from "react-icons/io";

const FoodFormPage: React.FC = () => {
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
      fetch(`http://localhost:3000/info/products/${id}`)
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
    window.scrollTo(0, 0);
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    if (e.target.name === "price") {
      let newValue = e.target.value;

      newValue = newValue.replace(/,/g, ".");
      let newConvertedValue = parseFloat(newValue);
      setFormData({
        ...formData,
        price: newConvertedValue,
      });
    } else if (e.target.name === "stock") {
      let newValue = e.target.value;
      let newConvertedValue = parseInt(newValue);
      setFormData({
        ...formData,
        stock: newConvertedValue,
      });
    } else setFormData({ ...formData, [e.target.name]: e.target.value });
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

    let uploadedImagePath = formData.image;
    if (imagePreview && formData.image !== "/logo.png") {
      const imageFile = (
        document.querySelector('input[type="file"]') as HTMLInputElement
      ).files?.[0];
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadResponse = await fetch(
          "http://localhost:3000/product/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          uploadedImagePath = uploadData.imagePath;
        } else {
          alert("Image upload failed.");
          return;
        }
      }
    }

    const updatedFormData = isAdd
      ? { ...formData, id: undefined, image: uploadedImagePath }
      : { ...formData, image: uploadedImagePath };
    const transformedData = {
      ...updatedFormData,
      features: updatedFormData.features?.replace(/\n/g, "<br>"),
      benefits: updatedFormData.benefits?.replace(/\n/g, "<br>"),
      composition: updatedFormData.composition?.replace(/\n/g, "<br>"),
      analytical: updatedFormData.analytical?.replace(/\n/g, "<br>"),
      additional_additives: updatedFormData.additional_additives?.replace(
        /\n/g,
        "<br>"
      ),
      technological_additives: updatedFormData.technological_additives?.replace(
        /\n/g,
        "<br>"
      ),
    };
    const method = isAdd ? "POST" : "PUT";
    const url = isAdd
      ? "http://localhost:3000/api/create/product"
      : "http://localhost:3000/api/update/product";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(transformedData),
    });

    if (response.ok) {
      alert(`Produto ${isAdd ? "adicionado" : "alterado"} com sucesso!`);
      handleGoBack();
    } else {
      alert(`Falha ao  ${isAdd ? "adicionar" : "alterar"} produto.`);
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
              {isAdd ? "Adicionar" : "Alterar"} Produto
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
            <label>Quantidade em Stock*</label>
            <input
              type="number"
              name="stock"
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
      </div>
    </>
  );
};

export default FoodFormPage;
