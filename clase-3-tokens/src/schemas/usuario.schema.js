import {Schema, model} from "mongoose";

const usuarioSchema = new Schema({
    nombre: {
        minLength: 2,
        maxLength: 20,
        type: String,
        required: true,
    },
    apellido :{
        minLength: 2,
        maxLength: 20,
        type: String,
        required: true,
    },
    correo : {
        type: String,
        required: true,
        unique: true,
    },
    password : {
        required: true,
        type: String,
        minLength: 8,
    },
    nombreUsuario:{
        type: String,
        required: true,
        unique: true,
    },
    edad :{
        type: Number,
    },
},{
   timestamps: true,
   versionKey: false,
})

export default model("Usuario", usuarioSchema)