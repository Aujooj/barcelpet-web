import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

const AboutUs: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };

    if (!formData.name) {
      newErrors.name = "Nome não pode estar vazio";
      valid = false;
    } else {
      newErrors.name = "";
    }

    if (!formData.email) {
      newErrors.email = "Email não pode estar vazio";
      valid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.phone || formData.phone.length !== 9) {
      newErrors.phone = "Telefone não pode estar vazio";
      valid = false;
    } else {
      newErrors.phone = "";
    }

    if (!formData.subject) {
      newErrors.subject = "Assunto não pode estar vazio";
      valid = false;
    } else {
      newErrors.subject = "";
    }

    if (!formData.message) {
      newErrors.message = "Mensagem não pode estar vazia";
      valid = false;
    } else {
      newErrors.message = "";
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await fetch("http://localhost:3000/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: formData.email,
            subject: formData.subject,
            text: "",
            html: `
            <p><strong>Nome:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Telefone:</strong> ${formData.phone}</p>
            <p>${formData.message}</p>
            `,
          }),
        });
  
        if (response.ok) {
          alert("Email sent successfully!");
          setFormData({
            name: "",
            email: "",
            phone: "",
            subject: "",
            message: "",
          });
        } else {
          const errorData = await response.json();
          console.error("Error:", errorData);
          alert("Failed to send email. Please try again.");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen flex flex-col mt-20">  
        <div className="content-margin mx-auto max-w-7xl px-4 py-8">
          <section className="aboutUs-card bg-white p-8 rounded-lg shadow-lg">
            <div className="aboutUs-info">
              <h2 className="aboutUs-title text-3xl font-semibold text-gray-800">
                Quem somos?
              </h2>
              <p className="text-gray-600 mt-4">
                Somos uma família apaixonada por animais, formada, pelo Tio Nuno
                e a Tia Isabel, três filhas e seis bichinhos que enchem a nossa
                casa e o nosso projeto de alegria. Dia 1 de dezembro de 2020,
                realizamos o nosso sonho de abrir uma loja de animais.
                <br />
                <br />
                O nosso projeto nasceu do desejo de criar um espaço acolhedor e
                especial, onde os animais são tratados com amor e respeito.
                Trabalhamos juntos, com dedicação, para oferecer produtos e
                serviços de alta qualidade, sempre a pensar no bem-estar dos
                nossos clientes de quatro patas e não só.
                <br />
                <br />
                <strong className="block text-xl text-secondary">
                  Bem-vindo ao nosso espaço, onde o amor pelos animais é a nossa
                  essência!
                </strong>
              </p>
            </div>
          </section>

          <section id="team" className="mt-12">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Nossa equipa
            </h2>
            <div className="employees grid grid-cols-2 gap-6 md:grid-cols-4">
              <div className="text-center">
                <img
                  src="src/assets/employees/isabel.jpg"
                  alt="Isabel"
                  className="mx-auto rounded-full w-32 h-32 object-cover"
                />
                <p className="mt-2">
                  <span className="block text-xl font-medium">
                    Isabel Costa
                  </span>
                  "Tia"
                </p>
              </div>
              <div className="text-center">
                <img
                  src="src/assets/employees/nuno.jpg"
                  alt="Nuno"
                  className="mx-auto rounded-full w-32 h-32 object-cover"
                />
                <p className="mt-2">
                  <span className="block text-xl font-medium">Nuno Faria</span>
                  "Tio"
                </p>
              </div>
              <div className="text-center">
                <img
                  src="src/assets/employees/teddy.jpg"
                  alt="Gato Teddy"
                  className="mx-auto rounded-full w-32 h-32 object-cover"
                />
                <p className="mt-2">
                  <span className="block text-xl font-medium">Teddy</span>Chefe
                  1
                </p>
              </div>
              <div className="text-center">
                <img
                  src="src/assets/employees/garfield.jpg"
                  alt="Gato Garfield"
                  className="mx-auto rounded-full w-32 h-32 object-cover"
                />
                <p className="mt-2">
                  <span className="block text-xl font-medium">Garfield</span>
                  Chefe 2
                </p>
              </div>
            </div>
          </section>

          <section
            id="form-email"
            className="mt-12 bg-gray-100 p-8 rounded-lg shadow-lg"
          >
            <form onSubmit={handleSubmit} method="POST" className="space-y-4">
              <p className="text-lg text-gray-700">Envie-nos um email</p>
              <h2 className="text-2xl font-semibold text-gray-800">
                Estamos aqui para ajudar.
              </h2>

              <div className="input-field">
                <input
                  type="text"
                  placeholder="Nome completo"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="item w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  autoComplete="off"
                />
                {errors.name && (
                  <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}
              </div>
              <div className="input-field">
                <input
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="item w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  autoComplete="off"
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Telefone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="item w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  autoComplete="off"
                  minLength={9}
                  maxLength={9}
                />
                {errors.phone && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.phone}
                  </div>
                )}
              </div>
              <div className="input-field">
                <input
                  type="text"
                  placeholder="Assunto"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="item w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  autoComplete="off"
                />
                {errors.subject && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.subject}
                  </div>
                )}
              </div>
              <div className="textarea-field">
                <textarea
                  name="message"
                  placeholder="Sua mensagem"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="item w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={10}
                  autoComplete="off"
                />
                {errors.message && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.message}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="submitEmail w-full py-3 bg-primary text-white rounded-md mt-4 hover:bg-secondary transition"
              >
                Enviar
              </button>
            </form>
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AboutUs;
