import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Service = {
  id: number;
  title: string;
  description: string;
  image: string;
}

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/info/services")
      .then((res) => res.json())
      .then((data) => setServices(data));
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col mt-20">
      <Header />
      <div className="bg-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-white py-8">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-4xl font-bold mb-4">Nossos Serviços</h1>
          <p className="text-lg mb-6">
            Descubra o que temos para oferecer para o seu pet!
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((services) => (
            <div
              key={services.id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:scale-105 transform transition-transform duration-300"
            >
              <img
                src={services.image}
                alt={`Imagem de ${services.title}`}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-primary mb-2">
                  {services.title}
                </h3>
                <p className="text-gray-600">{services.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

      {/* Call-to-Action Section */}
      <section className="bg-secondary text-white py-6">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">Pronto para cuidar do seu pet?</h2>
          <p className="text-lg mb-6">
            Entre em contato conosco para agendar um serviço personalizado.
          </p>
          <a
            href="https://buk.pt/barcelpet"
            className="bg-white text-secondary px-6 py-3 rounded-md hover:bg-gray-100 transition"
          >
            Agende agora
          </a>
        </div>
      </section>
    </div>
      <Footer />
    </div>
  );
};
export default Services;
