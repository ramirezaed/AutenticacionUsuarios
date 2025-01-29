import { carritoController } from "./controller";
import express from "express"
import { carritoServicio } from "./service";
import { vendedorRoutes } from "../../middlewares/vendeMiddleware";
import { clientRoutes } from "../../middlewares/clienteMiddleware";


const {agregarCarrito,actualizarCarrito,buscarID,MostrarTodos, eliminarCarrito}=carritoController

const carritoRouter = express.Router()

carritoRouter.get("/buscarID/:id", vendedorRoutes,buscarID)
carritoRouter.get("/todos",vendedorRoutes ,MostrarTodos)
carritoRouter.post("/agregar", clientRoutes,agregarCarrito)
carritoRouter.delete("/eliminar", clientRoutes,eliminarCarrito)
carritoRouter.patch("actualizar/:id", vendedorRoutes, actualizarCarrito)

export default carritoRouter


