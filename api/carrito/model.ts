import { Schema, SchemaTypes, model } from "mongoose";
import Usuario from "../usuario/model";
import { create } from "qrcode";

const carritoSchemas = new Schema({
    usuarioID:{
        type: Schema.Types.ObjectId,
        ref: "Usuario",
        required:true,
        unique:true
    },

    producto: [ // es un arreglo de productos, es decir el carro va a contener productos con sus atributos
        {
        producto_id:{
            type: Schema.Types.ObjectId,
            ref:"Producto",
            required:true
            },
        cantidad: {
            type:Number,
            required:true
            }
        }
    ],

         total:{
            type: Number,
             required:true
            },
    },
    {timestamps:true}
    // En MongoDB, { timestamps: true } es una opción que se puede incluir en un esquema de Mongoose (una biblioteca de MongoDB para Node.js) para que automáticamente se añadan dos campos especiales a los documentos: createdAt y updatedAt.
    // createdAt: Almacena la fecha y hora en que se creó el documento.
    // updatedAt: Almacena la fecha y hora en que se actualizó por última vez el documento.

)

carritoSchemas.index({createAt:1}, {expireAfterSeconds: 60 * 60 * 24})
//el carrito expira en un dia, guarda la info un dia, si no se compro se borra

const Carrito = model ("Carrito",carritoSchemas)
export default Carrito;