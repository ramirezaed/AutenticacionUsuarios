import express from "express"
import { usuarioController } from "./controller";
import { adminRoutes } from "../../middlewares/adminMiddleware";
import { vendedorRoutes } from "../../middlewares/vendeMiddleware";
import { clientRoutes } from "../../middlewares/clienteMiddleware";

const userRouter = express.Router();

const { crearUsuario, editarUsuario, mostrarTodos, bajaUsuario, altaUsuario, 
        buscarPorId, buscarPorEmail, mostrarActivos, mostrarInactivos,cambiarRol,login,todosPaginados
      } = usuarioController;

userRouter.post("/crear", crearUsuario)
userRouter.patch("/editar/:id",clientRoutes,editarUsuario)
userRouter.get("/mostrar", adminRoutes,mostrarTodos,)
userRouter.patch("/baja/:id", adminRoutes,bajaUsuario)
userRouter.patch("/alta/:id",adminRoutes, altaUsuario)
userRouter.get("/buscar/:id", adminRoutes,buscarPorId)
userRouter.get("/buscarEmail",adminRoutes, buscarPorEmail)
userRouter.get("/activos", adminRoutes,mostrarActivos)
userRouter.get ("/inavtivos", adminRoutes,mostrarInactivos)
userRouter.patch("/cambiarRol/:id", adminRoutes,cambiarRol)
userRouter.post("/login", login)
userRouter.get("/listaDeUsuario", adminRoutes,todosPaginados)


export default userRouter;