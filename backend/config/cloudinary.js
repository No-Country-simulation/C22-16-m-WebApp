import { v2 as cloudinary } from 'cloudinary';  // Versión 2 de la librería 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Objeto 'cloudinary' configurado, para subir imágenes, vídeos, obtener URLs, etc, de manera centralizada.
export default cloudinary;
