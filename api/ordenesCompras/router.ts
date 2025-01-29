import { ordeComprasController } from "./controller";
import express from "express"
import { clientRoutes } from "../../middlewares/clienteMiddleware";
import { vendedorRoutes } from "../../middlewares/vendeMiddleware";

const ordenCommprasRouter = express.Router()
const {nuevaOrden, buscarOrdenPorId, buscarPorUsuario, mostrarTodas}=ordeComprasController


ordenCommprasRouter.get("/buscarID/:id",vendedorRoutes, buscarOrdenPorId)
ordenCommprasRouter.get("/buscarPorUsuario/:id" ,clientRoutes,buscarPorUsuario)
ordenCommprasRouter.get("/mostrarTodas", vendedorRoutes, mostrarTodas)
ordenCommprasRouter.post("nuevaOrden", clientRoutes, nuevaOrden)


export default ordenCommprasRouter