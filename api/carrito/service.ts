import { Icarrito } from "../../types";
import { carritoDao } from "./dao";
import Carrito from "./model";


const {agregarCarrito, actulizaCarrito, buscarID, MostrarTodos, eliminarCarrito }=carritoDao
class CarritoServicio{

    async agregarCarrito(carrito:Icarrito){
        try {
            if (!carrito){
                throw new Error ("error al crear carrito")
            }
            const nuevoCarrtito =await agregarCarrito(carrito)
            return nuevoCarrtito
       
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }

    async buscarID (id:string){
        try {
            if(!id || id.length === 0){
                throw new Error("carrito no encontrado");
            }
            const carrito = await buscarID(id)
            return carrito
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }

    async MostrarTodos(){
        try {
            const carritos =await MostrarTodos()
            if (!carritos){
                throw new Error("no hay carritos");               
            }
            return carritos
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }

    async actualizarCarrito (id:string, carrito:Icarrito){
        try {
            if (!id || id.length===0 || !carrito){
                throw new Error("no se encotnro el carrito");
            }
            const carritoActualizdo =await actulizaCarrito(id, carrito)
            if (!carritoActualizdo){
                throw new Error("no se pudo actualizar el carrito");
            }
            return carritoActualizdo
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }

    async eliminarCarrito (carrito:Icarrito){
        try {
            if (!carrito){
                throw new Error("carrito no encotnrado");
            }
            const eliminado = await eliminarCarrito(carrito)
            return eliminado
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }

}

export const carritoServicio= new CarritoServicio()