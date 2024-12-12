import { Link } from "react-router-dom";

interface BookCardProps {
    nombre: string;
    autor: string;
    imagen: string;
    categoria: string;
    id: string;
}

export default function BookCard({ nombre, autor, imagen, categoria, id }: BookCardProps) {
    return (
        <div className="border rounded-lg p-4 shadow-md w-72 bg-amber-100 flex flex-col">
            <img
                src={imagen}
                alt={nombre}
                className="w-full h-40 object-contain rounded-md mb-6"
            />
            <h3 className="text-lg font-bold">{nombre}</h3>
            <p className="text-gray-600">Autor: {autor}</p>
            <span className="text-sm text-gray-500 mb-6">
                Categoría: {categoria}
            </span>
            <Link
                to={`/book/${id}`} // Enlace a la ruta del libro
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mt-auto text-center"
            >
                Ver más
            </Link>
        </div>
    )
}