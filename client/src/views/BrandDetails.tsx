import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Product from "../interfaces/Product";

const BrandDetails: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const { animalType, brandId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/info/food/brands/${animalType}/${brandId}`)
      .then((res) => res.json())
      .then((data) => setProducts(data));

    window.scrollTo(0, 0);
  }, [animalType, brandId]);

  return (
    <div className="min-h-screen flex flex-col mt-20 bg-gray-100">
      <Header />
      <section className="bg-secondary text-white py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">{brandId}</h1>
      </section>

      <section className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.id}
              to={`/alimentacao/${animalType}/${brandId}/${product.id}`}
              className="block transform hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <img
                  src={product.image}
                  alt={`${product.name} - ${product.weight}`}
                  className="w-72 h-72 object-contain object-center mx-auto"
                />
                <div className="p-6 text-center">
                  <h3 className="text-xl font-semibold text-primary mb-2">
                    {`${product.name} - ${product.weight}`}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default BrandDetails;
