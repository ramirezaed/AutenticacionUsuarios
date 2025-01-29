import { productoServicio } from "./service";
import { Request, Response } from "express";
import { IproductoFiltro } from "./types";

const {
    crearProducto, editarProducto, buscarPorId, mostrarTodos, mostrarActivos, mostrarInactivos,
    altaProducto, bajaProducto, buscarNombre, buscarFiltro
   }= productoServicio

class ProductoController{
    async crearProducto (req:Request, res:Response){
        try {
            const nuevoProducto = req.body
            const productoCreado = await crearProducto(nuevoProducto)
            return res.status(201).json(productoCreado)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }
    async editarProducto (req:Request, res:Response){
        try{
            const id =req.params.id
            const productoEditado = await editarProducto(id, req.body)
            return res.status(200).json(productoEditado)
           }catch(error){
              return res.status(400).json({error: (error as Error).message})
                }
        }
    async buscarPorId (req:Request, res:Response){
        try {
            const idproducto = req.params.id
            const productobuscado = await buscarPorId(idproducto)
            return res.status(200).json(productobuscado)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }

    async buscarFiltro (req:Request, res:Response){
        const datosProductos: IproductoFiltro =req.query
        try {
        const productos =await buscarFiltro(datosProductos)
        return res.status(200).json(productos)
        } catch (error) {
        return res.status(400).json({error:(error as Error).message})
    }

    }
    async mostrarTodos (req:Request, res:Response){
        try {
            const listaProductos = await mostrarTodos()
            return res.status(200).json(listaProductos)
        } catch (error) {
            return res.status(400).json({error:(error as Error).message})
        }
    }
    async mostrarActivos (req:Request, res:Response){
        try{
            const listaProductos = await mostrarActivos()
            return res.status(200).json(listaProductos)
        }catch(error){
            return res.status(400).json({error: (error as Error).message})
                }
    }
    async mostrarInactivos (req:Request, res:Response){
        try {
            const inactivos = await mostrarInactivos()
            return res.status(200).json(inactivos)
        } catch (error) {
            return res.status(400).json({error: (error as Error).message})
        }
    }
    async altaProducto (req:Request, res:Response){
        try {
            const id = req.params.id
            const alta = await altaProducto(id)
            return res.status(200).json(alta)
        } catch (error) {
            return res.status(400).json({error: (error as Error).message})
        }
    }
    async bajaProdcuto (req:Request, res:Response){
    try {
        const id =req.params.id
        const productoBaja = await bajaProducto(id)
        return res.status(200).json(productoBaja)        
    } catch (error) {
        return res.status(400).json({error: (error as Error).message})
    }
    
    }
    async buscarNombre (req:Request, res:Response){
        try {
            const {nombre}= req.body
            const productoBucado =await buscarNombre(nombre)
            return res.status(200).json(productoBucado)
        } catch (error) {
            return res.status(400).json({error : (error as Error).message})
        }
    }
}

export const productoController = new ProductoController()

