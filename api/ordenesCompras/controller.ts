import { ordenComprasServicios } from "./service";
import { Request, response, Response } from "express";
import { Iorden } from "./types";


const {nuevaOrden, buscarOrdenPorId, buscarPorUsuario, MostrarTodas}=ordenComprasServicios

class OrdenComrpasController{

    async nuevaOrden(req:Request, res:Response){
      const datos: Iorden = req.body
        try {
            const nueva = await nuevaOrden(datos)
            return res.status(201).json(nueva)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }

    async mostrarTodas(req:Request, res:Response){
        try {
            const ordenes = await MostrarTodas()
            return res.status(200).json
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }
    async buscarOrdenPorId(req:Request, res:Response){
        const id = req.params.id
        try {
            const orden = await buscarOrdenPorId(id)
            return res.status(200).json(orden)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }

    async buscarPorUsuario(req:Request, res:Response){
        const id = req.params.id
        try {
            const orden = await buscarPorUsuario(id)
            return res.status(200).json(orden)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }
    
}

export const ordeComprasController = new OrdenComrpasController