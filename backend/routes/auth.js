import { Router } from 'express';
import {authenticate} from '../middleware/auth.js';
import {register, login, logout} from '../controller/authController.js';
import {getUser, deleteUser, updateUser} from '../controller/userController.js';

const router = Router();

// Rutas para registro, inicio y cierre de sesión
router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);

// Rutas para obtener, actualizar y borrar usuarios
router.get('/user', authenticate, getUser);			// Trae los datos del usuario para mostrarlos en la página de perfil
router.put('/update', authenticate, updateUser);	// Actualizar usuarios
router.delete('/delete', authenticate, deleteUser);	// Borrar usuarios

// Ruta para verificar el token de autenticación y proteger las rutas del frontend
router.get('/verify', authenticate, (req, res) => res.status(200).json({message: 'token válido'}));

export default router;
