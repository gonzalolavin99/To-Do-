// Importación de los módulos necesarios
import express, { json } from "express";  // Importa express y la función json del módulo express
import { nanoid } from "nanoid";  // Importa la función nanoid del módulo nanoid
import { readFile, writeFile } from "node:fs/promises";  // Importa las funciones readFile y writeFile del módulo fs/promises de Node.js
import cors from "cors";  // Importa el módulo CORS
import { todoModel } from "./model/todo.model.js";
import "dotenv/config";

// Creación de una instancia de la aplicación Express
const app = express();  // Inicia una nueva instancia de la aplicación Express
app.use(express.json());  // Utiliza el middleware express.json para analizar el cuerpo de las solicitudes con formato JSON
app.use(cors());  // Utiliza el middleware CORS para habilitar el intercambio de recursos de origen cruzado (CORS)
const PORT = process.env.PORT || 5000;

//GET de TODOS
app.get("/todos", async (req, res) =>{
try{
  const todos = await todoModel.findAll();
  return res.json(todos);
}catch(error){
  console.log("Error en GET /todos: ", error);
  return res.status(500).json({message:"Error al obtener los elementos"});
}
});

//GET de TODOS por ID
app.get("/todos/:id", async(req,res) =>{
  const id = req.params.id;
  try{
    const todo = await todoModel.findById(id);
    if(!todo){ 
    return res.status(404).json({ message: 'No se encontró ese Todo' });
  }
  res.json(todo);

  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Internal server error'});
  }
});

// Configuración del servidor para escuchar en el puerto 5000
app.listen(PORT, () => {  // Establece la aplicación para escuchar en el puerto 5000
  console.log(`Server listening on port http://localhost:${PORT}`);
});

// Ruta para manejar solicitudes POST a "/todos"
app.post("/todos", async (req, res) => {  // Maneja las solicitudes POST a la ruta "/todos"
  const { title } = req.body; // Extrae el título del cuerpo de la solicitud
  if( !title ) {   // Verifica si no hay un título proporcionado
    return res.status(400).json({ message: "El titulo es requerido." }) ;
  };

  const newTodo = {  // Crea un nuevo objeto de tarea con un ID único, el título proporcionado y el estado "no completado"
    id: nanoid(),  // Genera un ID único utilizando la función nanoid
    title,
    done: false,
  };
  try {
    const todo = await  todoModel.create(newTodo); // Crea una nueva tarea con el modelo y los datos enviados
    return res.json(todo);
  }catch(error){
    console.log (error);
    return res.status(500).json({message:"Error al crear el todo"});
  };
  let todos = await getTodos();  // Obtiene la lista actual de tareas almacenadas
  todos.push(newTodo);  // Agrega la nueva tarea a la lista
  await writeFile("todos.json", JSON.stringify(todos));  // Escribe la lista actualizada de tareas en el archivo "todos.json"
  res.status(201).json(newTodo);  // Envía una respuesta con el código de estado 201 (creado) y el nuevo objeto de tarea en formato JSON
});

// Ruta para manejar solicitudes DELETE a "/todos/:id"
app.delete("/todos/:id", async (req, res) => {  // Maneja las solicitudes DELETE a la ruta "/todos/:id"
  const id = req.params.id;  // Obtiene el ID de la tarea de los parámetros de la URL
  try{
    const todo = await todoModel.remove(id);
    if( !todo ){
      return res.status(404).json({ message: "No se encontró la tarea" });
    }
    return res.json({message:"Todo borrado"});
  } catch(error){
    console.log(error);
    return res.status(500).json({ message: "Internal server error"});
  }
  let todos = await getTodos();  // Obtiene la lista actual de tareas almacenadas
  const todo = todos.find((todo) => todo.id === id);  // Busca la tarea con el ID especificado
  if (!todo) {  // Si la tarea no existe, responde con un código de estado 404 (no encontrado)
    res.status(404).json({ message: "Todo not found" });
  }
  todos = todos.filter((todo) => todo.id !== id);  // Filtra la lista de tareas para eliminar la tarea con el ID especificado
  await writeFile("todos.json", JSON.stringify(todos));  // Escribe la lista actualizada de tareas en el archivo "todos.json"
  res.json(todos);  // Envía la lista de tareas actualizada como respuesta en formato JSON
});

// PUT /todos/:id
app.put("/todos/:id", async (req, res) => {
  const id = req.params.id;
  try {
  const todo = await todoModel.update(id);
  if (!todo) {
  return res.status(404).json({ message: "Todo not found" });
  }
  return res.json(todo);
  } catch (error) {
  console.log(error);
  return res.status(500).json({ message: "Internal server error" });
  }
  });

// Función asíncrona para obtener la lista de tareas desde el archivo "todos.json"
const getTodos = async () => {  // Define una función asíncrona llamada getTodos
  const fsResponse = await readFile("todos.json", "utf-8");  // Lee el contenido del archivo "todos.json" como una cadena UTF-8
  const todos = JSON.parse(fsResponse);  // Parsea la cadena JSON en un objeto JavaScript
  return todos;  // Devuelve l
};