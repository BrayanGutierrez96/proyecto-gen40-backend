import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

//sendFile: metodo para enviar archivos de tipo html, css, js, MP4, audio, jpg, png, etc
app.use(express.static(path.join(__dirname, "../static")));

// app.get("/", (req, res) => {
//     res.sendFile('static/index.html',{
//         root: path.join(__dirname,"../")
//     });
// })

// app.get("/home", (req, res) => {
//     res.sendFile('static/home.html',{
//         root: path.join(__dirname,"../")
//     });
// })
//--------------------------------------------------------------------------------------------

//send: metodo para enviar datos a la vista

app.get("/usuario", (req, res) => {
  res.send("Hola soy el usuario");
});

//json: metodo para enviar datos a la vista de tipo json

app.get("/usuario/json", (req, res) => {
  res.json({
    nombre: "Bryan",
    apellido: "Gutierrez",
    email: "bryangutierrez@gmail.com",
    telefono: "555-555-5555",
    direccion: "Calle 123, Piso 123, Ciudad 123",
    ubicacion: "Piso 123, Calle 123, Ciudad 123",
  });
});

//status y sendStatus: metodo para enviar datos a la vista de status

app.get("/usuario/status", (req, res) => {
  res.status(500).sendStatus(500);
});

//Queries: Propiedades de la peticion para obtener datos de la url
//Estructura de la query:
// ?nombre="contenido"&nombre2="contenido"&nombre3="contenido"
//Las queries las envia el cliente al servidor

app.get("/home", (request, res) => {
  console.log("nombre: " + request.query.nombre);

  res.sendFile("static/home.html", {
    root: path.join(__dirname, "../"),
  });
  res.send("Hola");
});

app.get("/queries", (request, res) => {
  const { userName, userEmail } = request.query;
  if (!userName || !userEmail) {
    return res.status(400).send("Missing userName or userEmail");
  }
  res.send(`<h1>Hola ${request.query.userName}</h1>`);
});

//Params: Propiedades de la peticion para obtener los parametros de la url
//Estructura de los parametros:
// localhost:3000/usuario/param1/contenido/param2/contenido

app.get("/params/:id", (req, res) => {
  const { id } = req.params;
  if (id == 6) {
    res.send("Hola soy el usuario " + id);
  }
  res.send("No encontrado");
});
export default app;
