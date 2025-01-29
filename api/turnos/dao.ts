import Turno from "./model";
import { Iturno } from "./type";


class TurnoDao{
    async crearTurno (turno: Iturno){
    try {
        const nuevoTurno = await Turno.create(turno)
        return nuevoTurno 
        }catch(error){
             throw Error ((error as Error).message)
            }
        }
    async mostrarTodos(){
        try {
            const turno = Turno.find()
            return turno
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async buscarPorcodigo(codigo_turno:string){
        try {
            const turno = await Turno.findOne({codigo_turno})
            return turno
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async buscarPorFecha (fecha :Date){
        try {
            const turnos =await Turno.find({fecha})
            return turnos
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    
    async cancelarTurno(codigo_turno: string){
        try{
        const cancelar = await Turno.findOneAndDelete({codigo_turno})
        return cancelar
            }catch(error){
        throw Error ((error as Error).message);
            }
        }
}

export const turnoDao = new TurnoDao()