import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/UserContext";

export const Private = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};
