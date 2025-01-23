import CartState from "./CartState";
import Product from "./Product";

export default interface CartContextProps {
  cart: CartState;
  addToCart: (product: Product, quantity: number, stock: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, newQuantity: number, stock: number) => void;
  clearCart: () => void;
  distinctItemsCount: number;
  calculateTotalPrice: () => number;
}
