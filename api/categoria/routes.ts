import express from "express"
import { categoriaController } from "./controller"
import { vendedorRoutes } from "../../middlewares/vendeMiddleware"



const {crearCategoria, editarCategoria, mostrarTodas,activas, inactivas}=categoriaController

const categoriaRouter = express.Router()

categoriaRouter.post("/crear",vendedorRoutes, crearCategoria)
categoriaRouter.patch("/editar/:id",vendedorRoutes,editarCategoria)
categoriaRouter.get("/verTodas", vendedorRoutes,mostrarTodas)
categoriaRouter.get("/activas", activas)
categoriaRouter.get("/inactivas",vendedorRoutes, inactivas)

export default categoriaRouter


