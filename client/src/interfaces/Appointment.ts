import User from "./User";
import Service from "./Service";

export default interface Appointment {
  id: number;
  petName: string;
  ownerId: number;
  owner: User;
  day: Date;
  timeStart: Date;
  serviceId: number;
  service: Service;
  status: string;
  comment?: string;
  createdAt: Date;
  updatedAt: Date;
}
