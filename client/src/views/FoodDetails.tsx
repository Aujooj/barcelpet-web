import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PageNotFound from "../components/PageNotFound";
import DescriptionDetailItem from "../components/DescriptionDetailItem";
import ListDetailItem from "../components/ListDetailItem";
import Product from "../interfaces/Product";
import Loading from "../components/Loading";
import { FaShoppingCart } from "react-icons/fa";

const FoodDetails: React.FC = () => {
  const [product, setProduct] = useState<Product | null>(null);
  const { animalType, brandId, foodId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [amount, setAmount] = useState<number>(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);

  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:3000/info/products/${foodId}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));

    window.scrollTo(0, 0);
  }, [animalType, brandId, foodId]);

  const handleAddToCart = useCallback(() => {
    if (product && !isAddingToCart) {
      setIsAddingToCart(true);
      addToCart(product, amount, product.stock);
      
      setTimeout(() => setIsAddingToCart(false), 1000);
    }
  }, [product, amount, isAddingToCart, addToCart]);

  return (
    <div className="min-h-screen flex flex-col mt-20 bg-gray-100">
      <Header />
      {loading ? (
        <Loading />
      ) : !product ? (
        <PageNotFound />
      ) : (
        <div className="product-page mx-20 p-16 bg-white shadow-lg rounded-lg my-10">
          <div className="product-header flex items-start space-x-6">
            <div className="h-80 w-80">
              <img
                className="h-full w-full object-contain"
                src={product.image}
                alt={`${product.name} - ${product.weight}`}
              />
            </div>
            <div className="product-info">
              <h1 className="product-name text-2xl font-bold text-gray-800">
                {`${product.name} - ${product.weight}`}
              </h1>
              <Link to={`/alimentacao/${animalType}/${brandId}`}>
                <h2 className="brand-name text-lg font-medium text-gray-600 mt-2">
                  {product.brand}
                </h2>
              </Link>
              {product.stock > 0 ? (
                <>
                  <p className="product-price text-xl font-semibold text-gray-800 mt-4">
                    Preço: {product.price} €
                  </p>
                  <p className="text-sm text-gray-500 mt-1">COM IVA</p>
                  <div className="mt-4 flex items-center space-x-4">
                    <button
                      onClick={() => setAmount((prev) => Math.max(prev - 1, 1))}
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 border border-gray-300 rounded-md shadow-sm text-lg font-semibold hover:bg-gray-300"
                      disabled={amount === 1}
                    >
                      -
                    </button>
                    <span className="text-lg font-medium">{amount}</span>
                    <button
                      onClick={() =>
                        setAmount((prev) => Math.min(prev + 1, product.stock))
                      }
                      className="w-8 h-8 flex items-center justify-center bg-gray-200 border border-gray-300 rounded-md shadow-sm text-lg font-semibold hover:bg-gray-300"
                      disabled={amount === product.stock}
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={handleAddToCart}
                    className="mt-4 px-6 py-2 bg-primary text-white font-semibold rounded-md hover:bg-secondary"
                    disabled={isAddingToCart}
                  >
                    <FaShoppingCart className="inline" /> Adicionar ao Carrinho
                  </button>
                </>
              ) : (
                <p className="text-xl font-bold text-red-600 mt-6">
                  Fora de Estoque
                </p>
              )}
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
