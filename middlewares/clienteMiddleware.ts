import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";
config()

export function clientRoutes(req:Request, res:Response, next: Function){
    const token =req.header("authtoken")
        if (!token){ //verifico que pase un token
            return res.status(401).json("acceso denegado")
            }
    try {
        const verificar = verify(token, process.env.JWT_SECRET!) as {rol_usuario: string}
            if(!verificar){ //verifico la firma del token 
                return res.status(401).json("acceso denegado")
            }
        const esCliente = verificar.rol_usuario === "cliente" // verifico el rol del usuario sea cliente
            if(!esCliente){
                return res.status(401).json("solo clientes registrados")
            }
            if (esCliente){ //si es cliente paso a la siguiente funcion (ejemplo comprar)
                next()
            }    
        }catch (error) {
            return res.status(400).json("token invalido")
            }
}