import { carritoServicio } from "./service";
import { Request, Response } from "express";

const {agregarCarrito, buscarID, MostrarTodos, actualizarCarrito, eliminarCarrito}=carritoServicio

class CarritoController{

    
    async agregarCarrito (req:Request, res:Response){
        const datosCarrito = req.body
        try {
            const nuevoCarrito = await agregarCarrito(datosCarrito)
            return res.status(201).json(nuevoCarrito)       
        } catch (error) {
            return res.status(400).json({error: (error as Error).message})
        }
    }

    async buscarID (req:Request, res:Response){
        const id =req.params.id
        try {
          const carrito = await buscarID(id)
          return res.status(200).json(carrito)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }

    async MostrarTodos(req:Request , res: Response){
        try {
            const carritos =await MostrarTodos()
            return res.status(200).json(carritos)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }

    async actualizarCarrito(req:Request, res:Response){
        const id=req.params.id
        const datos =req.body
        try {
            const carritoActualizado = await actualizarCarrito(id, datos)
            return res.status(200).json(carritoActualizado)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message});
        }
    }

    async eliminarCarrito(req:Request, res:Response){
        const datos= req.body
        try {
            const eliminado = await eliminarCarrito(datos)
            return res.status(200).json( "carrito eliminado")
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }
}

export const carritoController= new CarritoController()