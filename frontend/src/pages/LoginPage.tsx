import { useForm } from "react-hook-form";
import { useNavigate } from 'react-router-dom';

// Interfaz con los datos del formulario de inicio de sesión.
interface LoginFormInputs {
    email: string;
    password: string;
}

// Interfaz con los datos del formulario de registro.
interface RegisterFormInputs {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Función genérica para manejar login y registro
const handleAuth = async (url: string, data: any, navigate: any) => {
    try {
        // Realiza una solicitud HTTP POST al servidor para login o registro
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        // Obtiene la respuesta del servidor en formato JSON
        const result = await response.json();

        // Verifica si la respuesta fue exitosa
        if (response.ok) {
            // Almacena el token de autenticación en el almacenamiento local
            localStorage.setItem('authToken', result.token);

            // Redirige al usuario a la página principal después de un inicio de sesión o registro exitoso
            navigate('/');
        } else {
            // Maneja el caso en el que la respuesta no es exitosa
            alert(result.message);
        }
    } catch (error) {
        // Captura y maneja cualquier error que ocurra durante la solicitud HTTP
        console.error("Error al hacer la solicitud:", error);
    }
};

// Componente principal de la página de inicio de sesión
export default function LoginPage() {

    // Instancia del hook useNavigate para manejar la navegación entre rutas.
    const navigate = useNavigate();

    // Define la URL del backend desde las variables de entorno
    const backUrl = import.meta.env.VITE_API_URL;

    // Configuración de React Hook Form para el formulario de inicio de sesión
    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
    } = useForm<LoginFormInputs>();

    // Configuración de React Hook Form para el formulario de registro
    const {
        register: registerRegister,
        handleSubmit: handleRegisterSubmit,
        formState: { errors: registerErrors },
    } = useForm<RegisterFormInputs>();

    // Función que maneja el inicio de sesión cuando se envía el formulario
    const handleLogin = (data: LoginFormInputs) => {
        handleAuth(`${backUrl}/auth/login`, data, navigate);
    };

    // Función que maneja el registro cuando se envía el formulario
    const handleRegister = (data: RegisterFormInputs) => {
        if (data.password !== data.confirmPassword) {
            console.log('Las contraseñas no coinciden');
            return; // Detener la ejecución si las contraseñas no coinciden
        }
        handleAuth(`${backUrl}/auth/register`, data, navigate);
    };

    return (
        <div className="p-8 flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-8">Bienvenido a pasaLIBRO</h1>
            <div className="flex gap-8 w-full max-w-4xl">

                {/*Formulario de inicio de sesion*/}

                <form onSubmit={handleLoginSubmit(handleLogin)} 
                className="flex-1 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Iniciar sesión</h2>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Email</label>
                        <input type="email"
                            {...registerLogin("email", { required: "El correo es obligatorio" })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {loginErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{loginErrors.email.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Contraseña</label>
                        <input type="password"
                            {...registerLogin("password", { required: "La contraseña es obligatoria" })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {loginErrors.password && (
                            <p className="text-red-500 text-sm mt-1">{loginErrors.password.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
                        Ingresar
                    </button>
                </form>

                {/*Formulario de registro*/}

                <form onSubmit={handleRegisterSubmit(handleRegister)}
                className="flex-1 bg-white shadow-lg rounded-lg p-6">
                    <h2 className="text-2xl font-semibold mb-4">Registrarse</h2>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Nombre</label>
                        <input
                            type="text"
                            {...registerRegister("name", { required: "El nombre es obligatorio" })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {registerErrors.name && (
                            <p className="text-red-500 text-sm mt-1">{registerErrors.name.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Email</label>
                        <input
                            type="email"
                            {...registerRegister("email", { required: "El correo es obligatorio" })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {registerErrors.email && (
                            <p className="text-red-500 text-sm mt-1">{registerErrors.email.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Contraseña</label>
                        <input
                            type="password"
                            {...registerRegister("password", { required: "La contraseña es obligatoria" })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {registerErrors.password && (
                            <p className="text-red-500 text-sm mt-1">{registerErrors.password.message}</p>
                        )}
                    </div>
                    <div className="mb-4">
                        <label className="block mb-2 font-medium">Confirmar Contraseña</label>
                        <input
                            type="password"
                            {...registerRegister("confirmPassword", {
                                required: "Confirma tu contraseña",
                            })}
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                        {registerErrors.confirmPassword && (
                            <p className="text-red-500 text-sm mt-1">{registerErrors.confirmPassword.message}</p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
                    >
                        Registrarse
                    </button>
                </form>
            </div>
        </div>
    )
}