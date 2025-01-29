import express from "express";
import { turnoController } from "./controller";
import { vendedorRoutes } from "../../middlewares/vendeMiddleware";

const turnoRouter = express.Router();

const {crearTurno, buscarPorCodigo, mostrarTodos, buscarporFecha, cancelarTurno

}=turnoController

turnoRouter.post("/nuevo",crearTurno)
turnoRouter.get("/buscarCodigo", vendedorRoutes, buscarPorCodigo)
turnoRouter.get("/lista", vendedorRoutes,mostrarTodos)
turnoRouter.get("/buscarFecha", vendedorRoutes,buscarporFecha)
turnoRouter.post("/cancelar", cancelarTurno)

export default turnoRouter
