import { Schema, model } from "mongoose";

const productoSchemas = new Schema({
    nombre: {
        type: String,
        requerid:true,
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref:"Categoria",
       requerid: false,
    },
    descripcion:{
        type: String,
        required: true,
    },
    marca: {
        type: String,
        required:true
    },
    modelo:{
        type:String,
        required:true
    },
    precio_compra:{
        type: Number,
        required:true
    },
    precio_venta:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
        required:true,
    },
    stock_minimo:{
        type:Number,
        required:true     
    },
    estado:{
        type:Boolean,
        default:true
    },
    imagen:{
        type:String,
        default:"",
    }
})

const Producto = model("Producto", productoSchemas)

export default Producto;