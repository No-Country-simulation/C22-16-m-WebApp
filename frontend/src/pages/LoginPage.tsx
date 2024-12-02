import { useForm } from "react-hook-form"

interface LoginFormInputs {
    email: string;
    password: string;
}

interface RegisterFormInputs {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export default function LoginPage() {

    // React Hook Form para inicio de sesión
    const {
        register: registerLogin,
        handleSubmit: handleLoginSubmit,
        formState: { errors: loginErrors },
    } = useForm<LoginFormInputs>();

    // React Hook Form para registro
    const {
        register: registerRegister,
        handleSubmit: handleRegisterSubmit,
        formState: { errors: registerErrors },
    } = useForm<RegisterFormInputs>();

    // Función para manejar inicio de sesión
    const handleLogin = (data: LoginFormInputs) => {
        console.log("Datos de inicio de sesión:", data);
    };

    // Función para manejar registro
    const handleRegister = (data: RegisterFormInputs) => {
        console.log("Datos de registro:", data);
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