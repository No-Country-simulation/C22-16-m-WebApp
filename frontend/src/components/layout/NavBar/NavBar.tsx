import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';


export default function NavBar() {

    const [searchTerm, setSearchTerm] = useState("");

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
        console.log("Termino de busqueda", e.target.value);
    }

    return (
        <nav className='bg-green-900 flex justify-between items-center p-4'>
            <Link to={'/'} ><img src="./logo-beige.png" alt="logo" className='w-32' /></Link>
            <div className='flex items-center gap-20'>
                <ul className='flex gap-16 shrink-0'>
                    <li>
                        <NavLink to={'/about'}
                            className={({ isActive }) => `text-white block py-2 px-4 rounded-lg ${isActive ? 'bg-green-600' : 'hover:bg-green-700'}`}>
                            ¿Que es pasaLIBRO?
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to={'/upload'}
                            className={({ isActive }) => `text-white block py-2 px-4 rounded-lg ${isActive ? 'bg-green-600' : 'hover:bg-green-700'}`}>
                            Subir un libro
                        </NavLink>
                    </li>
                </ul>
                <div className="flex-1">
                    <input
                        type="text"
                        placeholder="Buscar libros..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="w-full max-w-xs px-4 py-2 rounded-lg text-green-900 focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                </div>
            </div>
            <NavLink to={'/login'}
                className={({ isActive }) => `text-white block py-2 px-4 rounded-lg ${isActive ? 'bg-green-600' : 'hover:bg-green-700'}`}>
                Iniciar sesión/Registrarse
            </NavLink>
        </nav>
    )
}