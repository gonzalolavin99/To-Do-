import pkg from "pg"; // Importa el paquete pg para interactuar con PostgreSQL
const { Pool } = pkg; // Extrae la clase Pool del paquete pg
import "dotenv/config";

export const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    allowExitOnIdle: true,
    });

try {
    await pool.query("SELECT NOW()") // Realiza una consulta simple para verificar que se haya podido establecer la conexión
    console.log("Conexión a la Base de Datos exitosa"); //Si la conexión fue exitosa, imprime el mensaje en  la consola
}catch(error){ //Instancia si hay un error
    console.log(`Error al realizar la conexión a la Base de Datos: ${error}`);
};
