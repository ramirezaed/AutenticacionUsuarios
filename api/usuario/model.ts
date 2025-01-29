//defino como sera la structura de la "tabla" usuarios
import {Schema, model} from "mongoose"; //sschema serian algo como las clases (POO)
import bcrypt from 'bcrypt';  //para encriptar password

const UsuarioSchemas= new Schema({
    nombre: {
        type: String,
        requiried:true, // que es un campo obligatorio
    },
    apellido:{
        type: String,
        required: true,
    },
    fecha_nacimiento:{
        type:Date,
        required: false,
    },
    email:{
        type:String,
        required: true,
        unique:true,
        match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
            'Por favor ingrese un correo electrónico válido']
        },         
    contraseña:{
            type:String, // aca hay que hacer un hashing(codificar)
            required:true,
        },
    telefono: {
        type: String,
        required: true,
        unique: true,
        match: [/^\+?\d{10,15}$/, "Debe ser un número de teléfono válido."]
    },
    direccion:{
        type:String,
        required:true
    },
    rol_usuario:{
        type: String,
        enum: ["admin","comprador","vendedor"],
        default:"comprador",
    },
   estado:{
        type: Boolean,
        default:true
    }
});

UsuarioSchemas.pre("save",async function (next) { //antes de guardar pre save
    try{
        const hashPassword = await bcrypt.hash (this.contraseña ?? "" , 10);
        
        this.contraseña = hashPassword; 
        next()
    }catch (error){
        console.log("error")
    }
})
const Usuario = model("Usuario", UsuarioSchemas)

export default Usuario;