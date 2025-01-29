import Servicio from "./model";
import { Iservicio } from "./types";


class ServicioDao {

    async crearServicio(servicio:Iservicio){
        try {
            const nuevoServicio = await Servicio.create(servicio)
            return nuevoServicio
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async buscarPorId(id:string){
        try {
            const servicioBuscado = await Servicio.findById(id)
            return servicioBuscado
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async buscarNombre (nombre :string){
        try {
            const buscado = await Servicio.find({nombre})
            return buscado
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async bajaServicio (id:string){
        try {
            const bajaServicio = await Servicio.findByIdAndUpdate (id, {estado:false}, {new:true})
            return bajaServicio
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async altaServicio (id:string){
        try {
        const servicioAlta = await Servicio.findByIdAndUpdate(id, {estado:true}, {new:true} )
        return servicioAlta
    }catch(error){
        throw Error ((error as Error).message)
        }
    }
    async editarServicio(id:string, servicio: Iservicio){
        try {
            const editar =await Servicio.findByIdAndUpdate(id)
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async mostrarTodos (){
        try {
            const servicios = await Servicio.find()
            return servicios
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async Inactivos (){
        try {
            const inactivos = await Servicio.find({estado:false})
            return inactivos
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async Activos (){
        try {
            const activos =await Servicio.find({estado:true})
            return activos
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
}
export const servicioDao =new ServicioDao()