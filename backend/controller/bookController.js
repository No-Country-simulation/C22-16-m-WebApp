import multer from 'multer';
import { PrismaClient } from '@prisma/client';
import cloudinary from '../config/cloudinary.js';

// Configurar Multer para almacenar imágenes de forma temporal
const storage = multer.memoryStorage(); // Usamos memoria para que no se guarde en el disco
const upload = multer({ storage: storage });

// Middleware de multer para manejar la carga de un solo archivo en una solicitud HTTP.
// El archivo debe ser enviado con el campo 'image' en el formulario o en la solicitud.
const prisma = new PrismaClient();

// Configurar multer para manejar la subida de un solo archivo con el nombre 'image' en el formulario
const uploadSingle = upload.single('image');

// Cargar imagen en cloudinary. Si la carga es exitosa, se crea un registro en la DB
const uploadImg = async (req, res) => {

  // Obtener datos del cuerpo de la solicitud `req.body`
  const { title, author, genre, condition, description } = req.body;

  try {
    // Subir la imagen a Cloudinary usando upload()
    const result = await cloudinary.uploader.upload(
      `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`,  // Convertir buffer a base64
      {
        folder: 'books',  // Especifica la carpeta en Cloudinary
        public_id: req.file.originalname, // Usa el nombre original del archivo como identificador
      }
    );

    // Datos para crear el registro en la BD
    const formData = { title, author, genre, condition, description, userId:req.userId, imageUrl:result.secure_url }

    // Ahora que la imagen está subida, crear el libro
    const bookResponse = await createBook(...Object.values(formData));
    
    // Si el registro es exitoso, devolver un mensaje http 200
    return res.status(200).json({message: bookResponse});

  } catch (error) {
    // Si ocurre algún error en la subida de la imagen, imprime el error
    console.error(error);
  }
};

// Función para crear el registro de libros en la DB despues de subir la imagen a cloudinary
const createBook = async (title, author, genre, condition, description, userId, imageUrl) => {
  try {
    // Crear registro en la tabla Book
    const newBook = await prisma.book.create({
      data: {
        title,
        author,
        genre,
        condition,
        description,
        imageUrl,  // La URL de la imagen subida a Cloudinary
        userId,
      },
    });

    // Si la creación del libro es exitosa, devolver un mensaje de éxito
    return 'Libro publicado exitosamente.';
  } catch (error) {
    // Si ocurre un error durante el proceso de creación del libro, se captura y se muestra un mensaje de error
    console.error('Error al crear el libro:', error);
  }
};

// Función para obtener todos los libros
const getAllBooks = async (req, res) => {
  try {
    // Consultar todos los libros de la base de datos
    const books = await prisma.book.findMany({
      orderBy: {
        createdAt: 'desc', // Ordenar los libros por fecha de creación (descendente)
      },
    });

    // Si no hay libros, devolver un mensaje
    if (books.length === 0) {
      return res.status(404).json({ message: 'No hay libros disponibles.' });
    }

    // Devolver los libros encontrados
    return res.status(200).json(books);
  } catch (error) {
    console.error('Error al obtener los libros:', error);
    return res.status(500).json({ message: 'Error al obtener los libros.' });
  }
};

// Función para obtener los libros de un usuario
const getUserBooks = async (req, res) => {
  try {
    // Obtener el userId del token (suponiendo que la autenticación ya se haya hecho)
    const userId = req.userId;

    // Consultar los libros del usuario
    const books = await prisma.book.findMany({
      where: {
        userId: userId, // Filtrar los libros por el userId
      },
      orderBy: {
        createdAt: 'desc', // Ordenar los libros por fecha de creación
      },
    });

    // Si no hay libros, devolver un mensaje
    if (books.length === 0) {
      return res.status(404).json({ message: 'No tienes publicaciones aún.' });
    }

    // Devolver los libros encontrados
    return res.status(200).json(books);
  } catch (error) {
    console.error('Error al obtener los libros:', error);
    return res.status(500).json({ message: 'Error al obtener los libros.' });
  }
};

// Función Actualizar libroS
const updateBook = async (req, res) => {
  try {
    // Desestructurar los parámetros del cuerpo de la solicitud (req.body)
    // Se obtiene el ID del libro y otros posibles campos para actualizar
    const { id, title, author, genre, condition, description, status } = req.body;

    // Validación: Verificar que se ha proporcionado un ID
    if (!id) {
      return res.status(400).json({ error: 'El ID del libro es obligatorio.' });
    }

    // Verificar si el libro existe
    const existingBook = await prisma.book.findUnique({
      where: { id: parseInt(id, 10) },
    });

    // Si el libro no existe, devolver un error 404 (Not Found)
    if (!existingBook) {
      return res.status(404).json({ error: 'El libro no existe.' });
    }

    // Realizar la actualización parcial del libro en la base de datos
    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id, 10) },
      data: {
        // Solo se actualizan los campos proporcionados
        ...(title && { title }),
        ...(author && { author }),
        ...(genre && { genre }),
        ...(condition && { condition }),
        ...(description && { description }),
        ...(status && { status })
      },
    });

    // Si la actualización es exitosa, devolver un mensaje de éxito y los datos del libro actualizado
    return res.status(200).json({ message: 'Libro actualizado exitosamente.', book: updatedBook });
  } catch (error) {
    // Si ocurre un error durante la actualización, capturarlo y devolver un error 500 (Internal Server Error)
    console.error('Error al actualizar el libro:', error);
    return res.status(500).json({ error: 'Error al actualizar el libro.' });
  }
}

export {
  uploadImg,      // Exportar la función para crear libros 
  uploadSingle,   // Exportar la configuración de multer para manejar la subida de una imagen 
  updateBook,     // Exportar la función para actualizar libros
  getUserBooks,    // Exportar la función para obtener todos los libros de un usuario
  getAllBooks     // Exportar la función para obtener todos los libros disponibles
}
