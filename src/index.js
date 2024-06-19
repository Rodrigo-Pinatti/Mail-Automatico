//Se cargan variables de entorno desde un archivo .env
require('dotenv').config();

//Se importa el modulo express
const express = require('express');

//Se instancia una aplicacion
const app = express();

//Se importa el modulo path que sirve para manejar rutas de archivo
const path = require('path');

//Configura la aplicación para que pueda parsear los datos de formularios enviados con application/urlencoded. 
//extended: false indica que solo se pueden parsear objetos de tipo string o array.
//app.use(express.json());: Configura la aplicación para que pueda parsear cuerpos de solicitudes en formato JSON.
app.use(express.urlencoded({extended: false}));
app.use(express.json());

//Incluye y usa el enrutador definido en (./routes/index.js.) Esto permite organizar las rutas de la aplicación en archivos separados.
app.use(require('./routes/index.js'));

//Configura un middleware para servir archivos estáticos desde el directorio public. 
//path.join(__dirname, 'public') construye la ruta absoluta al directorio public.
app.use(express.static(path.join(__dirname, 'public')));

//Define el puerto en el que se ejecutará el servidor. Si process.env.PORT está definido, se usa ese valor; de lo contrario, se usa el puerto 3000.
//Se inicia el servidor y lo hace escuchar en el puerto 3000. Cuando el servidor está listo, se ejecuta el callback que imprime "Server en puerto 3000" en la consola.
const PORT = process.env.PORT || 3000;
app.listen(3000, ()=>{
    console.log('Server en puerto 3000');
})
