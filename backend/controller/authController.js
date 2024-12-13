import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client.js';
import secretKey from '../config/config.js'; 

const SECRET_KEY = secretKey; // Guardar la clave secreta en una constante

// Función registro de usuario
const register = async (req, res) => {

  // Extraer los datos del cuerpo de la solicitud
  const { name, email, password } = req.body;

  // Verificar que todos los campos sean proporcionados
  if (!name || !email || !password) {
    // Si falta algún campo, responder con error
    return res.status(400).json({ message: 'Todos los campos son obligatorios.' });
  }

  // Hashear la contraseña antes de guardarla
  const hashedPassword = await bcrypt.hash(password, 10); // 10 es el factor de complejidad para el hash

  try {
    // Intentar crear el usuario en la base de datos
    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    // Generar un token JWT con el ID y correo del usuario, válido por 1 hora
    const token = jwt.sign({ userId: user.id, email }, SECRET_KEY, { expiresIn: '1h' });

    // Responder con los datos del usuario y el token
    res.status(201).json({ name, email, token });
  } catch (err) {
    // Si el correo ya existe, responder con un mensaje de error
    res.status(400).json({ message: 'El correo ya está registrado.' });
  }
}

// Función inicio de sesión
const login = async (req, res) => {

  // Extraer los datos de la solicitud
  const { email, password } = req.body;

  // Verificar que los campos sean proporcionados
  if (!email || !password) return res.status(400).json({ message: 'Todos los campos son obligatorios.' });

  // Buscar al usuario en la base de datos usando el correo electrónico
  const user = await prisma.user.findUnique({ where: { email } });

  // Si no se encuentra el usuario o las contraseñas no coinciden, responder con error
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Credenciales inválidas.' });
  }

  // Si las credenciales son correctas, generar un token JWT
  const token = jwt.sign({ userId: user.id, email }, SECRET_KEY, { expiresIn: '1h' });

  // Responder con el token generado
  return res.json({ token });
}

// Función para cierre de sesión
const logout = (req, res) => {
  // En este ejemplo, no se esta invalidando el token en un servidor,
  // Falta agregar la funcionalidad de "lista negra" de tokens.
  res.status(200).json({ message: 'Sesión cerrada exitosamente' }); // Respondemos con un mensaje de éxito
}

export {
  register,   // Exportar la función para registrar usuarios
  login,      // Exportar la función iniciar sesión
  logout      // Exportar la función cerrar sesión
}
