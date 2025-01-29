import Turno from "./model";
import { turnoServicio } from "./service";
import { Response, Request } from "express";

const {
    crearTurno, buscarPorCodigo, mostrarTodos, buscarPorFecha, cancelarTurno
}=turnoServicio

class TurnoController{

    async crearTurno (req:Request, res:Response){
        try {
            const Datosturno = req.body
            const turno = await crearTurno(Datosturno)
            return res.status(201).json(turno)
        } catch (error) {
            return res.status(400).json({error: (error as Error).message})
        }
    }
    async buscarPorCodigo(req:Request, res:Response){
        try {
            const {codigo_turno} = req.body
            const turno = await buscarPorCodigo(codigo_turno)
            return res.status(200).json(turno)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }
    async buscarporFecha (req:Request, res:Response){
        try {
            const {fecha} =req.body
            const turnos = await buscarPorFecha(fecha)
            return res.status(200).json(turnos)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }
    async mostrarTodos (req:Request, res:Response){
        try {
            const turnos = await mostrarTodos()
            return res.status(200).json(turnos)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }
    async cancelarTurno (req:Request, res: Response){
        try {
            const {codigo_turno}=req.body
            const cancelar= await cancelarTurno(codigo_turno)
            return res.status(200).json("Turno cancelado")
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }

}
export const turnoController = new TurnoController()