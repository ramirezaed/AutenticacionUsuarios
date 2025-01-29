import { Schema, model } from "mongoose";

const ServicioSchemas= new Schema ({
    nombre: {
        type: String,
        required: true,
    },
    precio: {
        type:Number,
        required:true,
    },
    descripcion :{
        type :String,
        required: true
    },
    estado:{
        type: Boolean,
        default : true
    }

})


const Servicio = model("Servicio", ServicioSchemas)

export default Servicio;