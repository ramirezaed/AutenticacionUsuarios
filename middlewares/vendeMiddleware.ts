import {Request, Response} from  "express"
import { verify } from "jsonwebtoken"   
import { config } from "dotenv"

config()

export function vendedorRoutes(req:Request , res:Response, next:Function){
    const token = req.header("authtoken") ;
    if(!token){
        return res.status(401).json("acceso denegado")
    }
    try {
        const verificar = verify (token, process.env.TOKEN_SECRET!) as {rol_usuario: string, estado:boolean};
        if(!verificar){
            return res.status(401).json("acceso denegado")
        }
        const esVendedor= (verificar.rol_usuario==="vendedor" && verificar.estado)
        if(!esVendedor){
            return res.status(401).json("acceso denegado")
        }
        if(esVendedor){
            next();
        }

    } catch (error) {
        return res.status(400).json("token invalid")
    }
}