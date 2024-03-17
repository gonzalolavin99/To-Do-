// Importación de los módulos necesarios
import express, { json } from "express";  // Importa express y la función json del módulo express
import { nanoid } from "nanoid";  // Importa la función nanoid del módulo nanoid
import cors from "cors";  // Importa el módulo CORS
import { todoModel } from "./model/todo.model.js";
import "dotenv/config";
import todoRoute  from  "./routes/todo.route.js";

// Creación de una instancia de la aplicación Express
const app = express();  // Inicia una nueva instancia de la aplicación Express
app.use(express.json());  // Utiliza el middleware express.json para analizar el cuerpo de las solicitudes con formato JSON
app.use(cors());  // Utiliza el middleware CORS para habilitar el intercambio de recursos de origen cruzado (CORS)
app.use ("/todos", todoRoute);

const PORT = process.env.PORT || 5000;

// Configuración del servidor para escuchar en el puerto 5000
app.listen(PORT, () => {  // Establece la aplicación para escuchar en el puerto 5000
  console.log(`Server listening on port http://localhost:${PORT}`);
});


