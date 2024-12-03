interface BookCardProps {
    nombre: string;
    autor: string;
    imagen: string;
    categoria: string;
}

export default function BookCard({ nombre, autor, imagen, categoria }: BookCardProps) {
    return (
        <div className="border rounded-lg p-4 shadow-md w-72 bg-amber-100 flex flex-col">
            <img
                src={imagen}
                alt={nombre}
                className="w-full h-40 object-contain rounded-md mb-4"
            />
            <h3 className="text-lg font-bold">{nombre}</h3>
            <p className="text-gray-600">Autor: {autor}</p>
            <span className="text-sm text-gray-500">
                Categoría: {categoria}
            </span>
            <button className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 mt-auto">Ver más</button>
        </div>
    )
}