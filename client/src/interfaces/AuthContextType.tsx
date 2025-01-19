import User from "./User";

export default interface AuthContextType {
  token: string | null;
  user: User | null;
  setToken: (token: string | null) => void;
  setUser: (token: User | null) => void;
  logout: () => void;
}
