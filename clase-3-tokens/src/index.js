import express from "express";
import {connectDB} from "./db.js";
import usuarioRouter from "./routes/usuarios.routes.js";

const passwordDb = process.env.DB_PASSWORD ? "✔️  ****" : "❌ no password" ;
const usernameDb = process.env.DB_USER;
console.log("Pass: ", passwordDb);
console.log("User: ", usernameDb);

const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1",usuarioRouter)





app.use((req,res)=>{
    res.status(404).send("<h1>Ruta no encontrada</h1>");
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
})