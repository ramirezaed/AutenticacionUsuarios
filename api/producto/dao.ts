import { create } from "qrcode";
import Producto from "./models";
import { Iproducto } from "../../types";

class ProductoDao{
    async crearProducto (producto:Iproducto){
        try {
            const nuevoProducto = await Producto.create(producto)
            return nuevoProducto
         } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async editarProducto(productoId:string, producto :Iproducto){
         try {
            const productoEditado = await Producto.findByIdAndUpdate(productoId, producto, {new:true})
            return productoEditado
         } catch(error) {
            throw Error ((error as Error).message)
        }
    }
    async buscarPorId (productoId:string){
        try {
            const producto = await Producto.findById(productoId)
            return producto
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async buscarFiltro(
        categoria :string | undefined, 
        nombre: string | undefined,
        precio_menor : number| undefined,
        precio_mayor : number| undefined,
        marca: string |undefined, 
        modelo:string |undefined,
        pagina: string, 
        limite:string, 
        sort: -1 | 1 | undefined,
        keyword:string|undefined){
            // sort -1 | 1 | ordena de forma ascendente o descente o no los ordena
            try {
            //Number(pagina): Representa el número de la página actual
            //Number(limite): Es el número de productos que se muestra por página.
            // La fórmula multiplica el número de productos por página (limite)
            // por el número de páginas anteriores a la actual (page - 1), para saber 
            // cuántos productos debe omitir. en la pagina dos omitiria 10 productos
                const saltar = (Number(pagina)-1) * Number(limite)          
                const productos = await Producto.find({
                stock:{ $gt: 0}, estado :true, // busca con estado true y stock $gt (mayorque) cero
                ...(categoria ?{categoria}:{}),
                ...(nombre ? {nombre}: {} ),
                ...(precio_menor && precio_mayor
                    ?{precio_venta: {$gte: precio_menor, $lte: precio_mayor}}
                    : {} ),
                ...(marca? {marca}: {} ),
                ...(modelo? {modelo}:{}),
                ...(keyword ? { name: { $regex: keyword, $options: "i" } } : {}),
                //keyword guarda lo que ingreso en el teclado, es lo que busca si no selecciono filtro              
                })
                .sort(sort && { precio_venta: sort })  //metodo sort () de mongo //sort ordena los resultados
                .skip (saltar)                  //metodo skip () de mongo
                .limit(Number(limite));         //metodo limit() de mongo
                return productos
            } catch (error) {
                throw Error ((error as Error).message);             
            }
    }
    async mostrarTodos(){
    try {
        const productos = await Producto.find()
        return productos
       } catch (error) {
        throw Error ((error as Error).message)        
        }
    }
    async mostrarActivos (){
        try {
            const productosActivos = await Producto.find( {estado:true} )
            return productosActivos
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async mostrarInactivos (){
        try {
            const inactivos = await Producto.find( {estado:false} )
            return inactivos
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async altaProducto(id:string) {
        try {
            const producto = await Producto.findByIdAndUpdate(id, {estado:true}, {new:true})
            return producto       
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async bajaProducto(id:string){
        try {
            const bajaProducto = await Producto.findByIdAndUpdate(id, {estado:false}, {new:true})
            return bajaProducto
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async buscarNombre (nombre:string){     
        try {
            const productoBuscado = await Producto.find({nombre})
            return productoBuscado
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
}

export const productoDao = new ProductoDao()