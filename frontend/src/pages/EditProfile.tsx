import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

interface User {
  name: string;
  lastname: string;
  email: string;
  phone: string;
}

const EditProfile = () => {
  const [userData, setUserData] = useState<User | null>(null);
  const [name, setName] = useState<string>(''); 
  const [lastname, setLastname] = useState<string>(''); 
  const [email, setEmail] = useState<string>(''); 
  const [phone, setPhone] = useState<string>(''); 
  const [password, setPassword] = useState<string>(''); 
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const token = localStorage.getItem('authToken');  // Obtener el token del almacenamiento local
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/user`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`, // Enviar token en el header para obtener los datos del usuario
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching user data');
        }

        const data: User = await response.json();
        
        setUserData(data);
        setName(data.name || '');
        setLastname(data.lastname || '');
        setEmail(data.email || '');
        setPhone(data.phone || '');
        setLoading(false);
      } catch (error: any) {
        setError('Error al cargar los datos del usuario.');
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Verificar si al menos un campo ha cambiado (nombre, apellido, email, teléfono, password)
    const isUpdated = name.trim() || lastname.trim() || email.trim() || phone.trim() || password.trim();
    if (!isUpdated) {
      alert('No proporcionaste ningún valor para actualizar.');
      return;
    }

    // Preparar los datos a enviar en formato JSON
    const updatedData = {
      name: name.trim(),
      lastname: lastname.trim(),
      email: email.trim(),
      phone: phone.trim(),
      password: password.trim(),
    };

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/update`, {
        method: 'PUT',  // Usamos PUT en lugar de POST
        headers: {
          'Authorization': `Bearer ${token}`,  // Enviar el token en el header para la autenticación
          'Content-Type': 'application/json',  // Enviar los datos como JSON
        },
        body: JSON.stringify(updatedData),  // Enviar los datos en formato JSON
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Error al actualizar los datos');
      }

      navigate('/profile'); // Redirigir a la página de perfil después de actualizar
    } catch (error: any) {
      setError(error.message); // Mostrar mensaje de error si ocurre algún problema
    }
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  if (error) {
    return <div className="text-red-600 text-center">{error}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Editar Perfil</h2>
      
      <div className="mb-6">
        <p className="text-sm text-gray-600 mb-4 text-center">
          Actualiza solo los campos que desees. No es necesario completarlos todos.
        </p>
      </div>
      
      <div className="mb-6">
        <label htmlFor="name" className="block text-xl font-semibold text-gray-700">Nombre</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="lastname" className="block text-xl font-semibold text-gray-700">Apellido</label>
        <input
          type="text"
          id="lastname"
          name="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="email" className="block text-xl font-semibold text-gray-700">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="phone" className="block text-xl font-semibold text-gray-700">Teléfono</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-xl font-semibold text-gray-700">Contraseña</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        type="submit"
        className="w-full py-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Guardar Cambios
      </button>
    </form>
  );
};

export default EditProfile;
