import { Router } from 'express';
import {authenticate} from '../middleware/auth.js';
import {uploadImg, getUserBooks, uploadSingle, updateBook, getAllBooks} from '../controller/bookController.js';

const router = Router();

// Rutas para la gestión de libros
router.get('/getallbooks', authenticate, getAllBooks);				// Obtener todos los libros de la DB
router.get('/getbooks', authenticate, getUserBooks);				// Obtener todos los libros de un usuario
router.post('/upload', authenticate, uploadSingle, uploadImg);		// Cargar la imagen de un libro a cloudinary
router.put('/update', authenticate, updateBook)						// Actualizar libros

export default router;
