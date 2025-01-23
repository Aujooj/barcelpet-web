import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";
import { IoIosArrowRoundBack } from "react-icons/io";
import ServiceCategory from "../interfaces/ServiceCategory.ts";

const ServiceCategoryFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isAdd = id === "adicionar";
  const [formData, setFormData] = useState<ServiceCategory>({
    id: 0,
    title: "",
    description: "",
    image: "/logo.png",
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAdd) {
      fetch(`http://localhost:3000/info/serviceCategories/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setFormData(data);
          setImagePreview(data.image);
        });
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

    let uploadedImagePath = formData.image;
    if (imagePreview && formData.image !== "/logo.png") {
      const imageFile = (
        document.querySelector('input[type="file"]') as HTMLInputElement
      ).files?.[0];
      if (imageFile) {
        const formData = new FormData();
        formData.append("image", imageFile);

        const uploadResponse = await fetch(
          "http://localhost:3000/serviceCategory/upload",
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

    const method = isAdd ? "POST" : "PUT";
    const url = isAdd
      ? "http://localhost:3000/api/create/serviceCategory"
      : "http://localhost:3000/api/update/serviceCategory";

    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedFormData),
    });

    if (response.ok) {
      alert(`Categoria ${isAdd ? "adicionada" : "alterada"} com sucesso!`);
      handleGoBack();
    } else {
      alert(`Falha ao ${isAdd ? "adicionar" : "alterar"} categoria.`);
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
              {isAdd ? "Adicionar" : "Alterar"} Categoria
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
            <label>Título*</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <label>Descrição*</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="p-2 border border-gray-300 rounded"
            />
            <label>Imagem</label>
            {imagePreview && (
              <img src={imagePreview} alt="Preview" className="mt-2 max-w-40" />
            )}
            <input type="file" onChange={handleImageChange} className="py-2" />
            <p>(*) Campos obrigatórios</p>
          </form>
        </div>
      </div>
    </>
  );
};

export default ServiceCategoryFormPage;
