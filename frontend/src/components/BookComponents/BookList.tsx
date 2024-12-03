import BookCard from "./BookCard";

interface Book {
    id: string;
    nombre: string;
    autor: string;
    imagen: string;
    categoria: string;
}

interface BookListProps {
    books: Book[];
}

export default function BookList({ books }: BookListProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {books.map((book) => (
                <BookCard
                    key={book.id}
                    nombre={book.nombre}
                    autor={book.autor}
                    imagen={book.imagen}
                    categoria={book.categoria}
                />
            ))}
        </div>
    )
}           