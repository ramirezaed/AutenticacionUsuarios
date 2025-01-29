import { servicioController } from "./controller";
import  express from "express";
import { vendedorRoutes } from "../../middlewares/vendeMiddleware";

const {crearServicio,buscarPorId, bajaServicio,buscarNombre, altaServicio,
    mostrarTodos, Activos, Inactivos
}=servicioController

const servicioRouter= express.Router()

servicioRouter.post("/crear", crearServicio,vendedorRoutes)
servicioRouter.get("/buscar/:id", buscarPorId,vendedorRoutes)
servicioRouter.get("/buscarNombre",buscarNombre)
servicioRouter.patch("/baja/:id",bajaServicio,vendedorRoutes)
servicioRouter.patch("/alta/:id", altaServicio,vendedorRoutes)
servicioRouter.get("/lista",mostrarTodos)
servicioRouter.get("/activos",Activos)
servicioRouter.get("/inactivos",Inactivos)

export default servicioRouter