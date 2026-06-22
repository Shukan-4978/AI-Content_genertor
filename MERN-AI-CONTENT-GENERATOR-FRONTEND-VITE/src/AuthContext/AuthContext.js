import { createContext, useContext } from "react";
import { checkUserAuthStatusAPI } from "../apis/user/usersAPI";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const queryClient = useQueryClient();

  // Make request using react query
  const { isError, isLoading, data, isSuccess } = useQuery({
    queryFn: checkUserAuthStatusAPI,
    queryKey: ["checkAuth"],
    retry: false, // Disable retrying on 401 error
  });

  const isAuthenticated = data?.isAuthenticated === true;
  const isAdmin = data?.isAdmin === true;

  // Update the user auth after login
  const login = () => {
    queryClient.setQueryData(["checkAuth"], { isAuthenticated: true });
    queryClient.invalidateQueries({ queryKey: ["checkAuth"] });
  };

  // Update the user auth after logout
  const logout = () => {
    queryClient.setQueryData(["checkAuth"], { isAuthenticated: false, isAdmin: false });
    queryClient.invalidateQueries({ queryKey: ["checkAuth"] });
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isAdmin, isError, isLoading, isSuccess, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

//Custom hook
export const useAuth = () => {
  return useContext(AuthContext);
};
