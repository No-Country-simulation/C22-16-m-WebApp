import { useState } from "react";
import { useParams } from "react-router-dom";
import Books from "../../services/Books.json";

type Book = {
    id: string;
    nombre: string;
    autor: string;
    categoria: string;
    descripcion: string;
    imagen: string;
    usuario: string;
    telefono: string;
};

export default function BookDetails() {
    const { id } = useParams(); // Obtiene el ID del libro desde la URL
    const book = Books.find((book: Book) => book.id === id); // Busca el libro por ID
    const [showPhone, setShowPhone] = useState(false); // Estado para controlar el dropdown

    if (!book) {
        return (
            <div className="flex items-center justify-center h-screen">
                <h1 className="text-2xl font-bold text-red-500">Libro no encontrado</h1>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6 bg-amber-100 rounded-lg shadow-md mt-10 flex">
            <img
                src={book.imagen}
                alt={book.nombre}
                className="w-72 h-72 object-contain rounded-md mr-6"
            />
            <div className="flex flex-col justify-between w-full">
                <h1 className="text-3xl font-bold text-gray-800 mb-2">{book.nombre}</h1>
                <h2 className="text-xl text-gray-600 mb-2">Autor: {book.autor}</h2>
                <p className="text-gray-700 mb-4">Categoría: {book.categoria}</p>
                <p className="text-gray-800 mb-6">{book.descripcion}</p>
                <p className="text-gray-600 mb-4">
                    <strong>Subido por:</strong> {book.usuario}
                </p>
                <div className="flex items-center justify-between space-x-4 mt-6">
                    <div className="relative">
                        <button
                            onClick={() => setShowPhone((prev) => !prev)}
                            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                        >
                            Contactar
                        </button>
                        {showPhone && (
                            <div className="absolute left-full top-0 mt-0 p-2 bg-white border border-gray-300 rounded-lg shadow-lg w-auto whitespace-nowrap transition-opacity duration-300 ease-in-out opacity-100">
                                <p className="text-gray-800">
                                    <strong>Teléfono:</strong> {book.telefono}
                                </p>
                            </div>
                        )}
                        <div className={`absolute left-full top-0 mt-0 p-2 bg-white border border-gray-300 rounded-lg shadow-lg w-auto whitespace-nowrap transition-opacity duration-300 ease-in-out ${showPhone ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            <p className="text-gray-800">
                                <strong>Teléfono:</strong> {book.telefono}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-end">
                        <button
                            onClick={() => window.history.back()} // Vuelve a la página anterior
                            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700"
                        >
                            Volver
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
