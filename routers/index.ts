import express from "express";
import userRouter from "../api/usuario/routes";
import productoRouter from "../api/producto/routes";
import turnoRouter from "../api/turnos/router";
import servicioRouter from "../api/servicios/routes";
import categoriaRouter from "../api/categoria/routes";
import carritoRouter from "../api/carrito/routes";
import ordenCommprasRouter from "../api/ordenesCompras/router";

const router = express.Router();

router.use("/usuarios", userRouter);
router.use("/productos", productoRouter);
router.use("/turnos", turnoRouter)
router.use("/servicios", servicioRouter);
router.use("/categorias",categoriaRouter);
router.use("/carrito", carritoRouter)
router.use("/orden", ordenCommprasRouter)
//router.use("/orders", orderRouter);

export default router;
