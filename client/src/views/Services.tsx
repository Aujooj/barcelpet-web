import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Service from "../interfaces/Service";
import Loading from "../components/Loading";

const Services: React.FC = () => {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetch("http://localhost:3000/info/services")
      .then((res) => res.json())
      .then((data) => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
      window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col mt-20">
      <Header />
      <div className="bg-gray-100 min-h-screen">
        <section className="bg-secondary text-white py-8">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold mb-4">Nossos Serviços</h1>
            <p className="text-lg mb-6">
              Descubra o que temos para oferecer para o seu pet!
            </p>
          </div>
        </section>

        <section className="py-12">
          <div className="container mx-auto px-6">
            {loading ? (
              <Loading />
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-white shadow-lg rounded-lg overflow-hidden"
                  >
                    <img
                      src={service.image}
                      alt={`Imagem de ${service.title}`}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold text-primary mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600">
                        {service.description
                          .split("<br>")
                          .map((line, index) => (
                            <p key={index}>{line}</p>
                          ))}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="bg-primary text-white py-6">
          <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Pronto para cuidar do seu pet?
            </h2>
            <p className="text-lg mb-6">
              Entre em contato conosco para agendar um serviço personalizado.
            </p>
            <a
              href="https://buk.pt/barcelpet"
              className="bg-white text-primary px-6 py-3 rounded-md hover:bg-gray-100 transition"
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
