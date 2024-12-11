import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookCardProfile from '../components/BookComponents/BookCardProfile'; // Asegúrate de importar correctamente el componente

// Definir la interfaz de los datos de usuario
interface User {
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
}

const ProfilePage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const backUrl = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('authToken');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${backUrl}/auth/user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching user data');
        }

        const data: User = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchUserPosts = async () => {
      try {
        const response = await fetch(`${backUrl}/book/getbooks`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          setPosts([]);
          return;
        }

        const postsData: Post[] = await response.json();
        setPosts(postsData);
      } catch (error: any) {
        console.log(error);
        setError(error.message);
      }
    };

    fetchUserData();
    fetchUserPosts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/login');
  };

  const handleEditProfile = () => {
    // Redirige al formulario de edición de perfil, por ejemplo, a "/edit-profile"
    navigate('/edit-profile');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl text-gray-600">Loading...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="text-xl text-red-600">{error}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-gray-100 py-8">
      <div className="w-full text-center mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">Bienvenido a tu espacio Pasalibro</h1>
        <hr className="my-4 border-gray-300" />
      </div>

      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg mb-8">
        <div className="flex justify-center mb-4">
          <img
            src={user?.user.imageUrl}
            alt="User Avatar"
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>
        <h2 className="text-2xl font-semibold text-center mb-2 text-gray-700">Usuario</h2>
        <p className="text-gray-600 text-center mb-4">{user?.user.name}</p>
        <h2 className="text-2xl font-semibold text-center mb-2 text-gray-700">Contacto</h2>
        <p className="text-gray-600 text-center mb-4">{user?.user.email}</p>
        <p className="text-gray-600 text-center mb-4">{user?.user.phone}</p>
        <button
          onClick={handleEditProfile}
          className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Editar Perfil
        </button>
        <button
          onClick={handleLogout}
          className="w-full mt-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">Libros Publicados</h2>
        {posts.length > 0 ? (
          <div className="flex flex-wrap gap-6 justify-center">
            {posts.map(post => (
              <BookCardProfile key={post.id} {...post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center">No tienes publicaciones.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
