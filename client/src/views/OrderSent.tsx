import React from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

const OrderSent: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  let order_total = location.state.order_total;

  const handleGoBack = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 text-center w-full max-w-md">
        <img src="/logo.png" alt="Logo" className="mx-auto w-24 mb-6" />
        <h1 className="text-3xl font-bold text-primary mb-4">
          Obrigado pela sua compra!
        </h1>
        <p className="text-gray-700 mb-4">
          Para concluir o pagamento, transfira{" "}
          <span className="font-semibold text-secondary">€{order_total}</span>{" "}
          através do MB WAY para o número abaixo:
        </p>
        <img src="/assets/mbway.png" alt="MB WAY Logo" className="mx-auto w-32 mb-6" />
        <div className="bg-gray-200 p-4 rounded-md mb-6">
          <p className="text-lg text-secondary font-bold">910 522 448</p>
        </div>
        <p className="text-gray-600 mb-6">
          Após a confirmação do pagamento, irá receber um email com os detalhes
          do seu pedido.
        </p>
        <button
          className="bg-primary text-white px-6 py-3 rounded hover:bg-secondary transition"
          onClick={handleGoBack}
        >
          Voltar ao Painel
        </button>
      </div>
    </div>
  );
};

export default OrderSent;
