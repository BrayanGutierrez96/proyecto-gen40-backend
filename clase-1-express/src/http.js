//Ejemplo de servidor http nativo con node
import http from "http";
import fs from "fs";

const servidor = http.createServer(function (req, res) {
  console.log(req.url);
  if (req.url == "/") {
    fs.createReadStream("static/index.html").pipe(res);
  } else if (req.url == "/home") {
    fs.createReadStream("static/home.html").pipe(res);
  } else if (req.url == "/user") {
    fs.createReadStream("static/home.html").pipe(res);
  }
});

servidor.listen(3000, () => {
  console.log("Servidor corriendo en el puerto " + 3000);
});
