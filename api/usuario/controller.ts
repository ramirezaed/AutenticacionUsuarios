import { Request, Response } from "express";
import {usuarioServicio} from "./service";
import { trusted } from "mongoose";


const {
    crearUsuario, editarUsuario, bajaUsuario, altaUsuario,mostrarTodos,buscarPorId,buscarPorEmail,
    mostrarActivos, mostrarInactivos, cambiarRol, login, todosPaginados
} = usuarioServicio;

class UsuarioController {
    async crearUsuario (req:Request, res:Response){
        try{
            const usuarioCreado = await crearUsuario(req.body)
            return res.status(201).json(usuarioCreado)
        }catch(error){
            return res.status(400).json({error: (error as Error).message})
        }
    }

    async editarUsuario(req:Request, res:Response){
        const userId =req.params.id
        const usuario =req.body
    try {
        const usuarioEditado =await editarUsuario(userId, usuario)
        return res.status(200).json(usuarioEditado);
    } catch (error) {
        return res.status(400).json({error: (error as Error).message})
    }}

    async bajaUsuario(req:Request, res:Response){
        try {
            const userid =req.params.id
            const baja = await bajaUsuario(userid)
            return res.status(200).json(baja)
        } catch (error) {
            return res.status(400).json({message: (error as Error).message,})
        }
    }

    async altaUsuario(req:Request, res:Response){
        try {
            const userId =req.params.id      
            const alta = await altaUsuario(userId)
            return res.status(200).json(alta)
        } catch (error) {
           // Error ((error as Error).message)
            return res.status(400).json({message: (error as Error).message,})
        }
    }
    async mostrarTodos(req:Request, res:Response){
    try{
        const mostrar = await mostrarTodos()
        return res.status(200).json(mostrar)
    }   catch(error){
        return res.status(400).json({ error: (error as Error).message });
                }
    }

    async todosPaginados(req: Request, res:Response){
        try {
            const usuarios=await todosPaginados()
            return res.status(200).json(usuarios)
        } catch (error) {
            return res.status(400).json({error: (error as Error).message})
        }
    }



    async buscarPorId (req:Request, res:Response){
        try {
            const userId=req.params.id
            const buscado = await buscarPorId(userId)
            return res.status(200).json(buscado)
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
        }
    }
    async buscarPorEmail (req:Request , res:Response){
        const {email} = req.body //req.query.email as string;  
        try {
            const user = await buscarPorEmail(email);
            return res.status(200).json(user);
          } catch (error) {
            return res.status(400).json({ error: (error as Error).message });
          }
        
    }
    async mostrarActivos (req:Request, res:Response){
        try {
            const activos = await mostrarActivos()
            return res.status(200).json(activos)
        } catch (error) {
          return res.status(400).json({ error: (error as Error).message }); 
        }
    }
    async mostrarInactivos (req:Request, res:Response){
        try {
            const inactivos = await mostrarInactivos()
            return res.status(200).json(inactivos)
        } catch (error) {
            return res.status(400).json({ error: (error as Error).message }); 
        }
    }

    async cambiarRol (req:Request, res:Response){
        const userId = req.params.id
        const {rol_usuario} = req.body
        try {
            
            const rolCambiado = await cambiarRol(userId, rol_usuario)
            return res.status(200).json(rolCambiado)
        } catch (error) {
            return res.status(400).json({error: (error as Error).message})            
        }
    }

    async login (req:Request, res:Response){
        try {
            const {token, userPayload} = await login(req.body)

              // Configura el token en el header
        res.setHeader('token', token); //authtoken

            return res.status(200).json(userPayload)

        } catch (error) {
            return res.status(400).json({error: (error as Error).message})
        }
    }
}


export const usuarioController =new UsuarioController()