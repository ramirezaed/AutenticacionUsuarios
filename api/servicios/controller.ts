import { serviService } from "./service";
import { Request, Response } from "express";
import { Iservicio } from "./types";

const {crearServicio, buscarPorId, bajaServicio,buscarNombre, altaServicio,
        mostrarTdodos, Activos, Inactivos, editarServicio
}=serviService

class ServicioController{
    async crearServicio(req:Request, res:Response){
        try {
            const servicio = req.body
            const nuevoServicio = await crearServicio(servicio)
            return res.status(201).json(nuevoServicio)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }
    async editarServicio(req:Request, res:Response){
        try {
            const id=req.params.id
            const servicio = req.body
            const servicioEditado=await editarServicio(id, servicio)
            return res.status(200).json(servicioEditado)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }
    async buscarPorId (req:Request, res:Response){
        try{
            const id = req.params.id
            const serviciobuscado =await buscarPorId(id)
            return res.status(200).json(serviciobuscado)
        }catch(error){
            return res.status(400).json({error:(error as Error).message})
        }
    }
    async buscarNombre (req:Request, res:Response){
        try {
            const {nombre} =req.body
            const buscado = await buscarNombre(nombre)
            return res.status(200).json(buscado)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }
    async bajaServicio (req:Request, res:Response){
        try {
            const id =req.params.id
            const servicio = await bajaServicio(id)
            return res.status(200).json(bajaServicio)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }
    async altaServicio (req:Request, res:Response){
     try {
        const id = req.params.id
        const servicioAlta =await altaServicio(id)
        return res.status(200).json(servicioAlta)
     } catch (error) {
        return res.status(400).json({error:(error as Error).message})
     }
    }
    async mostrarTodos (req:Request, res:Response){
        try {
            const servicios = await mostrarTdodos()
            return res.status(200).json(servicios)
        } catch (error) {
            return res.status(400).json({error: (error as Error).message})
        }
    }
    async Inactivos (req:Request, res:Response){
        try {
            const servicios = await Inactivos()
            return res.status(200).json(servicios)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }
    async Activos (req:Request, res:Response){
        try {
            const servicios = await Activos()
            return res.status(200).json(servicios)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }
}

export const servicioController = new ServicioController()