import { createContext, useContext, useReducer, useEffect } from "react";
import CryptoJS from "crypto-js";
import CartContextProps from "../interfaces/CartContextProps";
import CartState from "../interfaces/CartState";
import Product from "../interfaces/Product";

const ENCRYPTION_KEY =
  "emfi*pbvY93c$aQMQBAMs@uS8#KjdFx#jNYk#euvSTSrgXW$A8B3j7%E6Q3^AnQ^w!*qTMA5fq%nbQ3HA4&EKLA^FPCfyjY@Mtx6";

const CartContext = createContext<CartContextProps | undefined>(undefined);

const cartReducer = (state: CartState, action: any): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      const { product, quantity, stock: addToCartStock } = action.payload;  // Rename stock here to addToCartStock
      const validQuantity = quantity > addToCartStock ? addToCartStock : quantity;

      // Check if the product already exists in the cart
      const existingItemIndex = state.items.findIndex(
        (item) => item.product.id === product.id
      );

      if (existingItemIndex !== -1) {
        // If product exists, update its quantity
        const updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + validQuantity,
        };
        return { items: updatedItems };
      } else {
        // If product does not exist, add it to the cart
        return {
          items: [...state.items, { product, quantity: validQuantity }],
        };
      }

    case "REMOVE_FROM_CART":
      return {
        items: state.items.filter(
          (item) => item.product.id !== action.payload.productId
        ),
      };

    case "CLEAR_CART":
      return { items: [] };

    case "UPDATE_QUANTITY":
      const { productId, newQuantity, stock: updateQuantityStock } = action.payload; // Rename stock here to updateQuantityStock

      // Validate the quantity (ensure it doesn't go below 1 or above stock)
      const validNewQuantity = Math.max(1, Math.min(newQuantity, updateQuantityStock));

      const updatedItems = state.items.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: validNewQuantity }
          : item
      );

      return { items: updatedItems };

    default:
      return state;
  }
};

const loadCartFromLocalStorage = (): CartState => {
  try {
    const cartData = localStorage.getItem("cart");
    if (cartData) {
      const bytes = CryptoJS.AES.decrypt(cartData, ENCRYPTION_KEY);
      const decryptedCartData = bytes.toString(CryptoJS.enc.Utf8);

      if (decryptedCartData) {
        return JSON.parse(decryptedCartData);
      }
    }
  } catch (error) {
    console.error("Falha ao carregar o carrinho ", error);
  }
  return { items: [] };
};

const saveCartToLocalStorage = (cart: CartState) => {
  try {
    const cartData = JSON.stringify(cart);
    const encryptedCartData = CryptoJS.AES.encrypt(cartData, ENCRYPTION_KEY).toString();
    localStorage.setItem("cart", encryptedCartData);
  } catch (error) {
    console.error("Falha ao salvar carrinho ", error);
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(
    cartReducer,
    { items: [] },
    loadCartFromLocalStorage
  );

  useEffect(() => {
    saveCartToLocalStorage(cart);
  }, [cart]);

  const addToCart = (product: Product, quantity: number, stock: number) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: { product, quantity, stock },
    });
  };

  const removeFromCart = (productId: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { productId } });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const updateQuantity = (productId: number, newQuantity: number, stock: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, newQuantity, stock },
    });
  };

  const distinctItemsCount = cart.items.length;

  const calculateTotalPrice = () => {
    return cart.items.reduce((total, item) => {
      return total + item.product.price * item.quantity;
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
        distinctItemsCount,
        calculateTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
