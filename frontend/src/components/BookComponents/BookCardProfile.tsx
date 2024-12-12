import React from 'react';

// Definir la interfaz para las publicaciones
interface BookCardProfileProps {
  id: number;
  title: string;
  author: string;
  genre: string;
  condition: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

const BookCardProfile = ({ id, title, author, genre, condition, description, imageUrl, createdAt }: BookCardProfileProps) => {
  return (
    <div className="border rounded-lg p-4 shadow-md w-72 bg-amber-100 flex flex-col h-96">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-40 object-contain rounded-md mb-6"
      />
      <h3 className="text-lg font-bold">
        {title.charAt(0).toUpperCase() + title.slice(1)} {/* Primera letra en mayúscula */}
      </h3>
      <p className="text-gray-600">Autor: {author}</p>
      <span className="text-sm text-gray-500 mb-6">
        Categoría: {genre}
      </span>
      <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mt-auto">Ver más</button>
    </div>
  );
};

export default BookCardProfile;
