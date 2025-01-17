export default interface AuthContextType {
  token: string | null;
  user: string | null;
  userId: string | null;
  setToken: (token: string | null) => void;
  setUser: (token: string | null) => void;
  setUserId: (token: string | null) => void;
  logout: () => void;
}
