import dotenv from 'dotenv';

// Hacer que las variables de entorno definidas en el archivo .env estén disponibles a través de `process.env`.
dotenv.config();

const secretKey = process.env.JWT_SECRET;

export default secretKey;
