import  Carrito  from "./model";
import { Icarrito } from "../../types";


class CarritoDao {
// tengo que poner uno para buscar por fecha de la compra, usnado el timestamps que tengo en el modelo
// tengo que poner uno para buscar por fecha de la compra, usnado el timestamps que tengo en el modelo
// tengo que poner uno para buscar por fecha de la compra, usnado el timestamps que tengo en el modelo
// tengo que poner uno para buscar por fecha de la compra, usnado el timestamps que tengo en el modelo
    async agregarCarrito(carrito:Icarrito){         //crear carrito
         try {
         const nuevoCarrtito = await Carrito.create(carrito);
            return nuevoCarrtito
         } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async actulizaCarrito(id:string, carrito:Icarrito){
        try {
            const carritoActualizado = await Carrito.findByIdAndUpdate(id , carrito, {new:true})
            return carritoActualizado
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async eliminarCarrito (carrito:Icarrito){
       try {
        const eliminar =await Carrito.findByIdAndDelete(carrito)
        return eliminar
       } catch (error) {
        throw Error ((error as Error).message)
       }
    }
    async MostrarTodos (){
        try {
            const carritos =await Carrito.find()
            return carritos
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async buscarID(id:string){
        try {
            const carrito =await Carrito.findById(id)
            return carrito           
        } catch (error) {
            Error ((error as Error).message)
        }
    }
    // tengo que poner uno para buscar por fecha de la compra, usnado el timestamps que tengo en el modelo
}

export const carritoDao = new CarritoDao()