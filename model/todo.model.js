import { pool } from "../database/connection.js"; // Importamos el objeto pool de la conexión a la base de datos

// Definimos una función asíncrona llamada findAll que realiza una consulta para seleccionar todos los registros de la tabla "todos"
const findAll = async () => {
  const { rows } = await pool.query("SELECT * FROM todos"); // Realizamos la consulta utilizando el método query del objeto pool
  return rows; // Devolvemos los resultados de la consulta
};

// Definimos una función asíncrona llamada findById que busca un registro específico en la tabla "todos" según su ID
const findById = async (id) => {
  const query = "SELECT * FROM todos WHERE id= $1"; // Establecemos que la constante query sea el SQL mencionado
  const { rows } = await pool.query(query, [id]); // Ejecutamos la consulta utilizando el método query del objeto pool con el ID proporcionado
  return rows[0]; // Devolvemos el primer resultado encontrado
};

// Definimos una función asíncrona llamada create que inserta un nuevo registro en la tabla "todos" con los datos proporcionados
const create = async (todo) => {
  const query = "INSERT INTO todos (title, done) VALUES ($1, $2)  RETURNING *"; // Establecemos que la constante query sea el SQL mencionado
  const { rows } = await pool.query(query, [todo.title, todo.done]); // Ejecutamos la consulta utilizando el método query del objeto pool con los datos del nuevo todo
  return rows[0]; // Devolvemos el primer resultado, que debería ser el nuevo registro insertado
};

const remove = async(id) =>{
  const query = "DELETE FROM todos  WHERE id=$1 RETURNING *";
  const {rows} = await pool.query(query,[id]);
  return rows [0];
}

const update = async(id)=>{
  const query = "UPDATE todos SET done = NOT done WHERE id =  $1 RETURNING *";
  const  {rows}=await pool.query(query,[id]);
  return rows[0];
}

// Exportamos un objeto llamado todoModel que contiene las funciones findAll, findById y create para interactuar con la tabla "todos"
export const todoModel = { findById, findAll, create, remove,update };
