import { Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";
config();

export function adminRoutes(req: Request, res: Response, next: Function) {
  const token = req.header("authtoken");
  if (!token) {
    return res.status(401).json("Acceso denegado");
  }
  try {
    
    const verificar = verify(token, process.env.TOKEN_SECRET !) as { rol_usuario: string, estado:boolean };
    if (!verificar) {
        return res.status(401).json("Acceso denegado");
    }
    const isAdmin = (verificar.rol_usuario === "admin" && verificar.estado);
    if (!isAdmin){
        return res.status(401).json("usuario no autorizado");
      }
    if (isAdmin) {
        next();
    }
  } catch (error) {
    res.status(400).json("token invalido");
  }
}
