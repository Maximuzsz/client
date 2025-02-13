import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';

export const ProtectedRoutes = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verifica a autenticação apenas no navegador
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      setIsAuthenticated(!!token);
      setIsLoading(false);
    }
  }, []);

  if (isLoading) {
    return <div>Carregando...</div>; // Ou um componente de loading
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};