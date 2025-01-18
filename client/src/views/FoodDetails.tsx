import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageNotFound from "../components/PageNotFound";
import DescriptionDetailItem from "../components/DescriptionDetailItem";
import ListDetailItem from "../components/ListDetailItem";
import Product from "../interfaces/Product";

const FoodDetails: React.FC = () => {
  const [product, setProduct] = useState<Product>();
  const { animalType, brandId, foodId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3000/info/food/products/${foodId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [animalType, brandId, foodId]);

  return (
    <div className="min-h-screen flex flex-col mt-20 bg-gray-100">
      <Header />
      {!product ? (
        <PageNotFound />
      ) : (
        <div className="product-page mx-20 p-16 bg-white shadow-lg rounded-lg my-10">
          <div className="product-header flex items-start space-x-6">
            <div className="h-80 w-80">
              <img className="h-full w-full object-contain" src={product.image} alt={product.name} />
            </div>
            <div className="product-info">
              <h1 className="product-name text-2xl font-bold text-gray-800">
                {product.name}
              </h1>
              <Link to={`/alimentacao/${animalType}/${brandId}`}>
                <h2 className="brand-name text-lg font-medium text-gray-600 mt-2">
                  {product.brand}
                </h2>
              </Link>
            </div>
          </div>
          <DescriptionDetailItem
            title="Características"
            description={product.features}
          />
          <ListDetailItem title="Benefícios" description={product.benefits} />
          <DescriptionDetailItem
            title="Composição"
            description={product.composition}
          />
          <DescriptionDetailItem
            title="Componentes Analíticos"
            description={product.analytical}
          />
          <DescriptionDetailItem
            title="Aditivos Adicionais"
            description={product.additional_additives}
          />
          <DescriptionDetailItem
            title="Aditivos Tecnológicos"
            description={product.technological_additives}
          />
        </div>
      )}
      <Footer />
    </div>
  );
};

export default FoodDetails;
