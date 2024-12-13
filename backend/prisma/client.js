import { PrismaClient } from '@prisma/client';	// Cliente de Prisma para interactuar con la base de datos.

// Instancia para realizar operaciones de DB.
const prisma = new PrismaClient();

// Para hacer consultas a la base de datos desde otros archivos.
export default prisma;
