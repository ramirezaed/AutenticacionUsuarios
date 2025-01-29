import { model } from "mongoose";
import Orden from "./model";
import { Iorden } from "./types";

class OrdenComprasDao{
    // tengo que poner uno para buscar por fecha de la compra, usnado el timestamps que tengo en el modelo
    // tengo que poner uno para buscar por fecha de la compra, usnado el timestamps que tengo en el modelo
    // tengo que poner uno para buscar por fecha de la compra, usnado el timestamps que tengo en el modelo
    // tengo que poner uno para buscar por fecha de la compra, usnado el timestamps que tengo en el modelo
    
    async nuevaOrden(orden: Iorden){
        try {
            const nuevaOrden = await Orden.create(orden)
            return nuevaOrden
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }

    async buscarOrdenPorId (id:string){
        try {
            const orden = await Orden.findById(id)
            return orden
        } catch (error) {
            throw Error ((error as Error).message)        
        }
    }

    async MostrarTodas (){
        try {
            const todas = await Orden.find()
            return todas
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }

    async buscarPorUsuario (id:string){
        try {
            const miOrden = await Orden.findById(id)
            return miOrden
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }

}


export const ordenComprasDao = new OrdenComprasDao()