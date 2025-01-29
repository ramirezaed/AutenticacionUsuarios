import { Schema, model } from "mongoose";
import Usuario from "../usuario/model";
//compras por cada usuario
const OrdenSchemas = new Schema({
    
    usuario_id:{
        type: Schema.Types.ObjectId,
        ref:"Usuario",
        required:true
    }, 
    producto :[  // arreglo de productos
        {
        producto_id:{
            type: Schema.Types.ObjectId,
            ref:"Producto",
            require:true,
            },
        cantidad:{
            type: Number,
            required:true,
            default:1
            },
        sub_total: {
            type: Number,
            required:true
            }
        }
    ],
    
    precio_total :{
        type:Number,
        required:true
    },
    // fecha:{
    //     type:Date,
    //     default:Date.now,
    //     required:true,
    // },
    // estado: {
    //     type: Boolean,
    //     require:true,
    //     default:true
    // },
    // codigo:{
    //     type:String,
    //     unique: true,
    //     required: true
    // },
        } , 
        { timestamps: true }
)

const Orden = model("historialCompras", OrdenSchemas)

export default Orden