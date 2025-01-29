import Categoria from "./model";
import { categoriaServicio } from "./service";
import { Response, Request, json } from "express";

const {crearCategoria, editarCategoria, mostrarTodas, activas, inactivas, alta,baja}= categoriaServicio

class CategoriaController {

    async crearCategoria (req:Request, res:Response){
        try {
            const categoria = req.body
            const nuevaCategoria =await crearCategoria(categoria)
            return nuevaCategoria
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }
    async editarCategoria (req:Request, res:Response){
        try {
            const id =req.params.id
            const categoria =req.body
            const categoriaeditada = await editarCategoria(id , categoria)
            return res.status(200).json(categoriaeditada)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }
    async mostrarTodas(req:Request, res:Response){
    try {
        const categoria = await mostrarTodas()
        return res.status(200).json(categoria)
        } catch (error) {
        return res.status(400).json({error:(error as Error).message})
         }
    }
    async activas (req:Request, res:Response){
        try {
            const categoria = await activas()
            return res.status(200).json(categoria)
        } catch (error) {
            return res.status (400).json({error:(error as Error).message})
        }
    }
    async inactivas (req:Request, res:Response){
        try {
            const categoria = await inactivas ()
            return res.status(200).json(categoria)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }
    async alta (req:Request, res:Response){
        try {
            const id=req.params.id
            const categoria = await alta(id)
            return res.status(200).json(categoria)
        } catch (error) {
            return res.status(400).json({error:(error as Error)})
        }
    }
    async baja (req:Request, res:Response){
        try {
            const id = req.params.id
            const categoria = await baja(id)
            return res.status(200).json(categoria)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }

}

export const categoriaController = new CategoriaController