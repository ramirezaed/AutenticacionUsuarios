import { Schema, model } from "mongoose";

const categoriaSchema = new Schema ({
    mombre:{
        type: String,
        required:true,
    },
    estado:{
        type: Boolean,
        default: true,
    },
    descripcion:{
        type:String,
        required:false
    }
})
const Categoria = model ("Categoria", categoriaSchema)
export default Categoria;