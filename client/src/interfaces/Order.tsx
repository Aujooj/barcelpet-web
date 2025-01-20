export default interface Order {
  id: number;
  orderNumber: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
  user: {
    id: number;
    name: string;
    email: string;
  };
  orderItems: {
    id: number;
    quantity: number;
    productId: number;
    product: {
      id: number;
      name: string;
      price: number;
      image: string;
    };
    deliveryOption: string;
    address: string;
    phone: string;
  }[];
}
