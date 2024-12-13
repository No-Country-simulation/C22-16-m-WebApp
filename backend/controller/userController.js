import prisma from '../prisma/client.js';
import bcrypt from 'bcrypt';

// Función obtener usuario
const getUser = async (req, res) => {
  try {

    // Obtenemos el ID del usuario
    const userId = req.userId;

    // Validación: Verificar que se ha proporcionado un ID
    if (!userId) {
      return res.status(400).json({ message: 'El ID del usuario es obligatorio.' });
    }

    // Buscar al usuario en la base de datos utilizando el ID
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId, 10) },  // Convierte el ID a entero
    });

    // Si el usuario no existe, responder con un error 404
    if (!user) {
      return res.status(404).json({ message: 'El usuario no existe.' });
    }

    // Si se encuentra el usuario, devolverlo en la respuesta
    return res.status(200).json({ user });
  } catch (error) {
    // Manejo de errores: Si algo falla en el proceso, responder con un error 500
    console.error('Error al obtener el usuario:', error);
    return res.status(500).json({ message: 'Error al obtener el usuario.' });
  }
}

// Función actualizar usuario
const updateUser = async (req, res) => {
  try {

    // Obtenemos el ID del usuario
    const userId = req.userId;

    // Extraer los datos del cuerpo de la solicitud (req.body)
    const { name, lastname, email, password, phone, status } = req.body;

    // Validación: Verificar que se ha proporcionado un ID
    if (!userId) {
      return res.status(400).json({ error: 'El ID del usuario es obligatorio.' });
    }

    // Verificar si el usuario existe en la base de datos utilizando el ID
    const existingUser = await prisma.user.findUnique({
      where: { id: parseInt(userId, 10) },  // Convierte el ID a entero
    });
    console.log('userId ', name);
    // Si no se encuentra el usuario, responder con un error 404
    if (!existingUser) {
      return res.status(404).json({ error: 'El usuario no existe.' });
    }

    // Si se proporciona una nueva contraseña, realizar el hash de la misma
    const hashedPassword = password ? await bcrypt.hash(password, 10) : password;  

    // Actualizar los datos del usuario en la base de datos
    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId, 10) },  // Busca al usuario por su ID
      data: {
        // Actualiza solo los campos que se proporcionan en la solicitud
        ...(name && { name }),
        ...(lastname && { lastname }),
        ...(email && { email }),
        ...(password && { password: hashedPassword }),
        ...(phone && { phone }),
        ...(status && { status })
      },
    });

    // Responder con un mensaje de éxito y los datos del usuario actualizado
    return res.status(200).json({ message: 'Usuario actualizado exitosamente.', user: updatedUser });
  } catch (error) {
    // Manejo de errores: Si algo falla en el proceso, responder con un error 500
    console.error('Error al actualizar el usuario:', error);
    return res.status(500).json({ error: 'Error al actualizar el usuario.' });
  }
};

// Función eliminar usuario
const deleteUser = async (req, res) => {
  const userId = req.userId; // El ID del usuario se obtiene del middleware de autenticación
  try {
    // Eliminar el usuario de la base de datos usando su ID
    await prisma.user.delete({ where: { id: userId } });
    // Responder con un mensaje de éxito
    res.json({ message: 'Cuenta eliminada exitosamente.' });
  } catch (err) {
    // Si ocurre un error (por ejemplo, si no se encuentra el usuario), responder con un error 400
    res.status(400).json({ error: 'No se pudo eliminar la cuenta.' });
  }
}

export {
  getUser,     // Exportar la función para obtener los datos del usuario
  deleteUser,  // Exportar la función para eliminar usuario
  updateUser   // Exportar la función para actualizar usuario
}
