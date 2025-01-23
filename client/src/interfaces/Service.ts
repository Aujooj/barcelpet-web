import ServiceCategory from "./ServiceCategory";

export default interface Service {
  id: number;
  categoryId: number;
  category: ServiceCategory;
  petType: string;
  minWeight: number;
  maxWeight: number;
  price: number;
  duration: number;
}
