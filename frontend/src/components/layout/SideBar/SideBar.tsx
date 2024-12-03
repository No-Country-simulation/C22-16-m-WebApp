import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function SideBar() {

    const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);

    const toggleCategories = () => {
        setIsCategoriesOpen(!isCategoriesOpen);
    };

    return (
            <aside className="flex flex-col bg-green-600 text-white w-64 min-h-screen p-4">
                <ul className="flex flex-col gap-4">
                    <li>
                        <NavLink
                            to={'/profile'}
                            className={({ isActive }) => `block py-2 px-4 rounded-lg 
                        ${isActive ? 'bg-green-800' : 'hover:bg-green-700'}`}
                        >
                            Mi perfil
                        </NavLink>
                    </li>
                    <li>
                        <button onClick={toggleCategories}
                            className="text-white block py-2 px-4 rounded-lg hover:bg-green-700 whitespace-nowrap">
                            Categorías
                        </button>
                        {isCategoriesOpen && (
                            <ul className="ml-4 mt-2 flex flex-col gap-2">
                                <li>
                                    <NavLink to={'/categories/infantiles'}
                                        className={({ isActive }) => `text-white block py-2 px-4 rounded-lg ${isActive ? 'bg-green-800' : 'hover:bg-green-700'}`}>
                                        Infantiles
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/categories/juveniles'}
                                        className={({ isActive }) => `text-white block py-2 px-4 rounded-lg ${isActive ? 'bg-green-800' : 'hover:bg-green-700'}`}>
                                        Juveniles
                                    </NavLink>
                                </li>
                                <li>
                                    <NavLink to={'/categories/adultos'}
                                        className={({ isActive }) => `text-white block py-2 px-4 rounded-lg ${isActive ? 'bg-green-800' : 'hover:bg-green-700'}`}>
                                        Adultos
                                    </NavLink>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </aside>
    )
}