import { ReactNode, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

// Definición de las propiedades que acepta el componente ProtectedRoute
interface ProtectedRouteProps {
  element: ReactNode;  // El componente que se quiere proteger
}

// Componente ProtectedRoute que se encarga de proteger las rutas
const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  // Estado para manejar el estado de carga
  const [isLoading, setIsLoading] = useState(true);

  // Estado que determina si el usuario está autenticado o no
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  // Obtiene la ubicación actual (usado para redirigir después a la página de login)
  const location = useLocation();

  // Define la URL del backend desde las variables de entorno
  const backUrl = import.meta.env.VITE_API_URL;

  // useEffect se ejecuta una vez cuando el componente se monta
  useEffect(() => {
    // Recupera el token de autenticación del almacenamiento local
    const token = localStorage.getItem('authToken');

    // Si no hay token, marca como no autenticado y termina el proceso
    if (!token) {
      setIsAuthenticated(false);
      setIsLoading(false);
      return
    }

    // Función asíncrona para verificar si el token es válido
    const verifyToken = async () => {
      try {
        // Realiza una solicitud al backend para verificar el token
        const response = await fetch(`${backUrl}/auth/verify`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,  // Se pasa el token como encabezado de autorización
          },
        });

        // Si la respuesta es exitosa, el token es válido
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          // Si la respuesta falla, marca al usuario como no autenticado
          setIsAuthenticated(false);
        }
      } catch (error) {
        // Si ocurre un error durante la verificación, lo maneja y marca al usuario como no autenticado
        console.error('Error verificando el token', error);
        setIsAuthenticated(false);
      } finally {
        // Finalmente, cambia el estado de carga a falso
        setIsLoading(false);
      }
    };

    // Llama a la función para verificar el token
    verifyToken();
  }, []);  // El efecto se ejecuta solo una vez cuando el componente se monta

  // Mientras se verifica el token, se muestra un mensaje de carga
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // Si el usuario no está autenticado, se redirige al login
  if (!isAuthenticated) {
    alert('Registrate y/o inicia sesión');
    return <Navigate to="/login" state={{ from: location }} />;
  }

  // Si el usuario está autenticado, renderiza el componente protegido
  return <>{element}</>;
};

export default ProtectedRoute;
