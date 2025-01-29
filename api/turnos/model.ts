import { Schema, model } from "mongoose";

const TurnoSchemas= new Schema({
    usuarioId: { //este dato me permite relacionar con la coleccion usuario
        type: Schema.Types.ObjectId, 
        ref: "Usuario", 
        required: false // falso pporq para sacr un turno no es necesario que sea cliente
    },
    
    nombre: {
        type: String,
        required: true,
    },
    apellido: {
        type: String,
        required:true,
    },
    email:{
        type:String,
        required: true,
        unique:false,
        match: [ /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 
            'Por favor ingrese un correo electrónico válido']
        }, 
    telefono: {
        type: String,
        required: true,
        match: [/^\+?\d{10,15}$/, "Debe ser un número de teléfono válido."],
    },
    servicio:{
        type: Schema.Types.ObjectId, 
        ref: "Servicio", 
        required: true 
    },
    tipo_vehiculo: {
        type: String,
        required:true,
    },
    modelo:{
        type: String,
        required: true,
    },
    matricula: {
        type:String,
        required:true,
    },
    fecha: {
        type: Date,
        required: true,
        validate: {
            validator: (value: Date) => value > new Date(),
            message: "La fecha debe ser en el futuro.",
        },
    },
    precio: {
        type: Number,
        required: true,
    },
    codigo_turno :{
        type: String,
    },
    creado_el: {
        type: Date,
        default: Date.now,
    },

});
const Turno = model("Turno", TurnoSchemas)

export default Turno;