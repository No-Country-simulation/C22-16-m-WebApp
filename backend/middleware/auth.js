import jwt from 'jsonwebtoken';
import secretKey from '../config/config.js';

// Definir la constante SECRET_KEY con el valor de la clave secreta.
const SECRET_KEY = secretKey;

// Middleware de autenticación que se usa para verificar el token en las solicitudes.
export const authenticate = (req, res, next) => {

  // Obtener el encabezado de autorización de la solicitud (Authorization header).
  const authHeader = req.headers.authorization;

  // Verificar si el encabezado de autorización existe y si empieza con 'Bearer '.
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // Si el encabezado no es válido, responde con un error 401 (no autorizado).
    return res.status(401).json({ error: 'Token no proporcionado.' });
  }

  // Si el encabezado es válido, extraer el token (la parte después de 'Bearer ').
  const token = authHeader.split(' ')[1];

  try {
    // Intenta verificar y decodificar el token utilizando la clave secreta.
    const decoded = jwt.verify(token, SECRET_KEY);

    // Si la verificación es exitosa, almacena el userId decodificado en el objeto 'req',
    // para que esté disponible en las siguientes etapas del ciclo de vida de la solicitud.
    req.userId = decoded.userId;

    // Llamar a 'next()' para pasar el control al siguiente middleware o ruta.
    next();
  } catch (err) {
    // Si ocurre un error durante la verificación (token inválido o expirado),
    // responder con un error 401 (no autorizado).
    res.status(401).json({ error: 'Token inválido o expirado.' });
  }
};
