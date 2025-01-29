import { json } from "express";
import { categoriaDao } from "./dao";
import Categoria from "./model";
import { Icategoria } from "./types";

const {crearCategoria,editarCategoria,mostrartodas, activas , inactivas  ,alta  , baja     }= categoriaDao
class CategoriaServicio{

    async crearCategoria (categoria:Icategoria){
     try {
        if(!categoria){
            throw new Error ("error al crear categoria")
        }
        const nuevaCategoria = crearCategoria(categoria)
        return nuevaCategoria    
            } catch (error) {
        throw Error ((error as Error).message)      
        }
    }
    async editarCategoria(id:string, categoria:Icategoria){
        const {nombre, estado, descripcion}= categoria
        const dpPayLoad= {
            ... (nombre ? {nombre} : {}),
            ... (estado ? {estado} : {}),
            ... (descripcion ? {descripcion} : {})
        }      
        try {
            if (!id || !categoria){
                throw new Error("Error al editar categoria");
            }
            const categoriaEditada=await editarCategoria(id, categoria)
            return categoriaEditada
        } catch (error) {
            throw Error ((error as Error).message)
            }
    }
    async mostrarTodas (){
        try{
        const categorias = await mostrartodas()
        if (!categorias || categorias.length === 0 ){
            throw new Error("no hay categorias");
        }
        return categorias
    }catch(error){
        throw Error ((error as Error).message)        
        }
    }

    async activas (){
        try {
            const categorias = await activas()
            if (!categorias || categorias.length === 0){
                throw new Error("no hay categorias activas");
            }
            return categorias
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async inactivas (){
        try {
            const categorias = await inactivas()
            if(!categorias || categorias.length===0){
                throw new Error("no hay categorias inactivas");    
            }
            return categorias
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async alta (id:string){
        try {
            const verificar = await alta(id)
            if(!verificar){
                throw new Error("categoria no encontrada");
            }
            if (verificar.estado){
                throw new Error("categoria ya se encuentra activa");         
            }         
            return verificar
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async baja (id:string){
        try {
            const categoria = await baja(id)
            if (!categoria){
                throw new Error("categoria no encontrad");
            }
            if (categoria.estado){
                throw new Error("categoria ya esta inactiva");
            }
            return categoria
        } catch (error) {
            throw Error ((error as Error).message)
            
        }
    }
}

export const categoriaServicio = new CategoriaServicio()