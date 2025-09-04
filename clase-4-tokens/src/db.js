import { connect } from "mongoose";

 const connectDB =(async()=>{
    try {
        const result = await connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.xv3kqvz.mongodb.net/`)
        if(!result)
            return console.log("No se pudo conectar a la base de datos")
        console.log("Base de datos conectada")
    } catch (error) {
        console.log(error)
        console.error(error.message)
    }
})();

export default connectDB;