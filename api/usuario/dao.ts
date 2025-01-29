import Usuario from "./model";
import { Iusuario, UsuarioRol } from "../../types";
import { iUsuarioPayload } from "./types";

class UsuarioDao{
    async crearUsuario (usuario: Iusuario ){
        try{
            const nuevoUsuario = await Usuario.create(usuario)
        }catch(error){
            throw Error ((error as Error).message)
        }
    }
    async editarUsuario (userId: string, user: iUsuarioPayload){
        try{
            const usuarioEditado = await Usuario.findByIdAndUpdate(userId, user, {new:true})
            return usuarioEditado
        }catch(error){
            throw Error ((error as Error).message)
        }
    }
    async bajaUsuario (userId:string){
        try{
            const bajaUsuario = await Usuario.findByIdAndUpdate(userId, {estado:false} , {new:true})
            return bajaUsuario
        }catch(error){
            throw Error ((error as Error).message)
        }
    }
    async altaUsuario (userId:string){
        try{
            const altaUsuario = await Usuario.findByIdAndUpdate(userId, {estado:true}, {new:true})
            return altaUsuario
        }catch (error){
            throw Error ((error as Error).message)
        }
    }
    async buscarPorId (userId: string){
        try {
        const buscarPorId = await Usuario.findById(userId)
        return buscarPorId
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async buscarPorEmail (email: string){
        try {
            const  buscarPorEmail = await Usuario.findOne( {email} )
            return buscarPorEmail;
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async mostrarTodos (){
        try {
            const mostrarTodos = await Usuario.find()
            return mostrarTodos
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async todosPaginados(pagina:string, limite:string){
            try {
            const saltar=(Number(pagina)-1)*Number(limite)
            const usuarios= await Usuario.find()     
            .skip(saltar)
            .limit(Number(limite))
            return usuarios
            } catch (error) {
                throw Error ((error as Error).message)
            }
    }
    async mostrarActivos (){
        try {
            const activos = await Usuario.find( {estado:true} )
            return activos
        } catch (error) {
            throw Error ((error as Error).message)           
        }
    }
    async mostrarInactivos(){
        try {
            const inactivos = await Usuario.find({estado:false})
            return inactivos
        } catch (error) {
            throw Error ((error as Error).message)        
        }
    }
    async cambiarRol ( userId: string, rol_usuario: UsuarioRol){
        try {
            const  cambiarRol = await Usuario.findByIdAndUpdate(userId, {rol_usuario}, {new:true})
            return cambiarRol; 
        }catch (error) {
          throw Error ((error as Error).message)     
        }
    }
    
}

export const usuarioDao = new UsuarioDao();
