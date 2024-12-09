import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

// Interfaz con los datos para publicar un libro.
interface FormData {
  title: string;
  author: string;
  genre: string;
  condition: string;
  description: string;
  image: File | null;
}

// Componente principal para la carga de libroS
const UploadBook: React.FC = () => {

  // Instancia del hook useNavigate para manejar la navegación entre rutas.
  const navigate = useNavigate();

  // Define la URL del backend desde las variables de entorno
  const backUrl = import.meta.env.VITE_API_URL;

  // Estado que maneja los datos del formulario
  const [formData, setFormData] = useState<FormData>({
    title: "",
    author: "",
    genre: "for_everyone",  // Valor predeterminado para género
    condition: "used",      // Valor predeterminado para condición
    description: "",
    image: null,
  });

  // Maneja el cambio en los campos de texto y select
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

    // Extrae el nombre y valor del campo
    const { name, value } = e.target;

    // Actualiza el estado del formulario, manteniendo los datos previos y solo modificando el campo correspondiente.
    setFormData((prevData) => ({
      ...prevData,  // Mantiene los valores previos
      [name]: value, // Actualiza el campo correspondiente
    }));
  };

  // Maneja el cambio en el campo de carga de imagen
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    // Obtiene el archivo de la imagen
    const file = e.target.files ? e.target.files[0] : null;

    // Actualiza el estado del formulario, manteniendo los datos previos y solo modificando el campo de la imagen.
    setFormData((prevData) => ({
      ...prevData,   // Mantiene los valores previos
      image: file,   // Actualiza el campo de la imagen
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previene el comportamiento predeterminado de enviar el formulario

    // Verifica si todos los campos están completos antes de enviar
    if (!formData.title || !formData.author || !formData.genre || !formData.condition ||
        !formData.description || !formData.image) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    // Prepara los datos para el envío, usando FormData para enviar archivos
    const form = new FormData();
    form.append("title", formData.title);
    form.append("author", formData.author);
    form.append("genre", formData.genre);
    form.append("condition", formData.condition);
    form.append("description", formData.description);
    form.append("image", formData.image);  // Agrega el archivo de imagen

    try {
      const token = localStorage.getItem('authToken');

      // Realiza la solicitud HTTP para subir los datos del libro
      const response = await fetch(`${backUrl}/book/upload`, {
        method: "POST",
        body: form,  // Se pasa el FormData que contiene los datos del libro
        headers: {
          Authorization: `Bearer ${token}`, // Agrega el token de autorización en los encabezados
        }
      });

      // Si la respuesta falla, lanza un error
      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }

      // Si la respuesta es exitosa, se procesa a JSON
      const data = await response.json();

      // Notifica al usuario que el libro fue publicado
      alert(data.message);

      // Redirige al usuario a la página de perfil después de una publicación exitosa
      navigate('/profile');

    } catch (error) {
      // Si ocurre un error, muestra un mensaje de error
      console.error("Error en el envío del formulario:", error);
      alert("Hubo un error al publicar el libro.");
    }
  };

  return (
    // Formulario de carga de libro
    <form onSubmit={handleSubmit} className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">Publica un libro</h1>
      <p className="text-base text-gray-600 text-center mb-6">
        ¡Comparte tu libro con los demás y haz que llegue a nuevas manos! 
        Contribuye a que más lectores disfruten de nuevas historias, aprendizajes y aventuras.
      </p>
      
      <div className="mb-6">
        <label htmlFor="title" className="block text-xl font-semibold text-gray-700">Título</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="author" className="block text-xl font-semibold text-gray-700">Autor</label>
        <input
          type="text"
          id="author"
          name="author"
          value={formData.author}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="genre" className="block text-xl font-semibold text-gray-700">Género</label>
        <select
          id="genre"
          name="genre"
          value={formData.genre}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="for_everyone">Para todos</option>
          <option value="children">Infantiles</option>
          <option value="youths">Juveniles</option>
          <option value="adults">Adultos</option>
        </select>
      </div>
      
      <div className="mb-6">
        <label htmlFor="condition" className="block text-xl font-semibold text-gray-700">Tu libro es</label>
        <select
          id="condition"
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="used">Usado</option>
          <option value="worn">Gastado</option>
          <option value="new">Nuevo</option>
          <option value="like new">Como Nuevo</option>
        </select>
      </div>
      
      <div className="mb-6">
        <label htmlFor="description" className="block text-xl font-semibold text-gray-700">Descripción</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <div className="mb-6">
        <label htmlFor="image" className="block text-xl font-semibold text-gray-700">Sube una imagen</label>
        <input
          type="file"
          id="image"
          name="image"
          onChange={handleImageChange}
          required
          className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      
      <button
        type="submit"
        className="w-full py-3 mt-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Publicar
      </button>
    </form>
  );
}
export default UploadBook;
