
import { ordenComprasDao } from "./dao";
import { Iorden, IOrdenProducto } from "./types";
import { productoDao } from "../producto/dao";
import { Iproducto } from "../../types";
import Producto from "../producto/models";

const {buscarOrdenPorId, MostrarTodas, nuevaOrden, buscarPorUsuario}= ordenComprasDao
const{editarProducto, buscarPorId}= productoDao

class OrdenComprasServicios {

    async nuevaOrden(orden:Iorden){
        const {productos} = orden
        try {
            if (!orden){
            throw new Error("error al crear orden");
            }
            /// aca podria verificar si el pago se realizo
            const ordenNueva =await nuevaOrden(orden)
            if (!ordenNueva){
                throw new Error("error al crear la orden");                
            }

            productos.forEach(async (producto: IOrdenProducto) => {
                const productoDato = await buscarPorId(producto.producto_id)
                if(!productoDato){
                    throw new Error("producto no encontrado");                    
                }
                
                await editarProducto(producto.producto_id!, 
                  {stock: productoDato.stock - producto.cantidad} //-  producto.cantidad!})
            
            
                })    









            return ordenNueva

        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async buscarOrdenPorId(id:string){
        try {
            if(!id || id.length === 0){
                throw new Error("orden no encontrada");                
            }
            const orden = await buscarOrdenPorId(id)
            if (!orden){
                throw new Error("orden no encontrada");                
            }
            return orden
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async buscarPorUsuario (id:string){
        try {
            if(!id || id.length === 0){
                throw new Error("orden no encontrada");                
            }
            const orden = await buscarPorUsuario(id)
            if (!orden){
                throw new Error("orden no encontrada");                
            }
            return orden
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async MostrarTodas (){
        try {
            const ordenes = await MostrarTodas()
            if (!ordenes){
                throw new Error("no hay ordenes");
            }
            return ordenes
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }

}

export const ordenComprasServicios = new OrdenComprasServicios()