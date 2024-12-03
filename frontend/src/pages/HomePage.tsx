import { useParams } from "react-router-dom";
import BookList from "../components/BookComponents/BookList";
import Books from "../services/Books.json"

export default function HomePage() {

    const {categoryId} = useParams();
    const filteredBooks = categoryId ? Books.filter(book => book.categoria.toLowerCase() === categoryId.toLowerCase()) : Books

    console.log("Categoría seleccionada:", categoryId); // Verifica la categoría seleccionada
    console.log("Libros filtrados:", filteredBooks); // Verifica los libros filtrados

    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Libros Recomendados</h1>
            <BookList books={filteredBooks} />
        </div>
    )
}