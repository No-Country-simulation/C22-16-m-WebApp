import BookList from "../components/BookComponents/BookList";
import Books from "../services/Books.json"

export default function HomePage() {
    return (
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Libros Recomendados</h1>
            <BookList books={Books} />
        </div>
    )
}