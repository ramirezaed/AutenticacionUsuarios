import Categoria from "./model";
import { Icategoria } from "./types";

class CategoriaDao{
    async crearCategoria (categoria: Icategoria){
        try {
            const nuevaCategoria = await Categoria.create(categoria)
            return nuevaCategoria
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async editarCategoria (id: string, categoria: Icategoria){
        try {
            const categoriaEditada =await Categoria.findByIdAndUpdate(id , categoria)
            return categoriaEditada
        } catch (error) {
            throw Error ((error as Error).message) 
        }
    }
    async mostrartodas(){
        try {
            const categorias = await Categoria.find()
            return categorias
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async activas (){
        try {
            const activas = Categoria.find({estado:true})
            return activas
        } catch (error) {
            throw Error ((error as Error).message)        
        }
    }
    async inactivas (){
        try {
            const categoria = await Categoria.find({estado:false})
            return categoria
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async alta (id:string){
        try {
            const categoria =await Categoria.findByIdAndUpdate(id , {estado:true}, {new:true})
            return categoria
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async baja (id:string){
        try {
            const categoria = await Categoria.findByIdAndUpdate(id, {estado:false}, {new:true})
            return categoria
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
}
export const categoriaDao = new CategoriaDao()