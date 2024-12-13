import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import bookRoutes from './routes/book.js';
import morgan from 'morgan';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));

// Ruta para gestionar autenticación
app.use('/auth', authRoutes);

// Ruta para gestionar libros
app.use('/book', bookRoutes);

// Ruta Raíz
app.get('/', (req, res) => res.send('API funcionando correctamente.'));

export default app;
