import { productoDao } from "./dao";
import { Iproducto } from "../../types";
import { IproductoFiltro, IproductoPayload } from "./types";
import Producto from "./models";
import { NumericData } from "qrcode";


const {
    crearProducto,editarProducto, buscarPorId,mostrarTodos, mostrarActivos, mostrarInactivos,
    altaProducto, bajaProducto, buscarNombre, buscarFiltro
} = productoDao

class ProductoServicio{
    async crearProducto(producto: Iproducto){
        try {
            const nuevoProducto = await crearProducto (producto)
            if (!nuevoProducto){
                throw new Error ("error al crear producto")
            }
            return nuevoProducto
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }

    async editarProducto (id: string , producto: IproductoPayload){
        const {nombre, categoria,descripcion,marca, modelo,precio_compra,precio_venta,
               stock,stock_minimo,imagen } = producto
        const dbIproductoPayload={
            ... (nombre? {nombre}: {}),
            ... (categoria?{categoria}:{}),
            ... (descripcion? {descripcion}:{}),
            ... (marca? {marca}: {}),
            ... (modelo? {modelo}:{}),
            ... (precio_compra?{precio_compra}:{}),
            ... (precio_venta? {precio_venta}:{}),
            ... (stock? {stock}:{}),
            ... (stock_minimo? {stock_minimo}:{}),
            ... (imagen? {imagen}:{})
        }        
        try {
            const verificar = await Producto.findById(id)
            if (!verificar){
                throw new Error ("Producto no encontrado")
            }
            const productoEditado = await editarProducto(id, producto)
            return productoEditado
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }

    async buscarPorId(id:string) {
        try {
            const buscado= await buscarPorId(id)
            if(!buscado){
                throw new Error ("producto no encontrado")
            }
            return buscado
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }

    async buscarFiltro(filtro : IproductoFiltro){
    const {nombre, categoria,marca,modelo, filtro_precio, rango_precio,
        pagina ="1", limite="10", keyword}= filtro
            let precio_menor: number | undefined
            let precio_mayor : number | undefined
            let sort: -1 | 1 | undefined
            if (filtro_precio){
                sort = filtro_precio === "masBajo" ? 1 : -1
            }

            if (rango_precio){ //verifico que el rango de precio no este vacio
                const [inicio, fin] = rango_precio.split(","); // divido con una , el rango de precio entre 100 , 500
                precio_menor = Number(inicio)
                precio_mayor = Number(fin)
            }         
        try {
            const producto = await buscarFiltro(
                categoria,
                nombre,
                precio_menor,  // Aquí pasas el precio_masBajo
                precio_mayor,  // Aquí pasas el precio_masAlto
                marca,
                modelo,
                pagina,
                limite,
                sort,
                keyword
            );
                return producto 
         } catch (error) {
        throw Error ((error as Error).message)

        }
    }

    async mostrarTodos (){
        try {
            const listaProductos = await mostrarTodos()
            if (!listaProductos){
                throw new Error ("no hay productos")
            }
            return listaProductos
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }

    async mostrarActivos(){
        try {
            const verActivos = await mostrarActivos()
            if (!verActivos){
              throw new Error ("no hay productos activos")
            }
            return verActivos
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }

    async mostrarInactivos(){
        try {
            const inactivos = await mostrarInactivos()
            if  (!inactivos ){
                throw new Error ("no hay productos inactivos")
            }
            return inactivos
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async altaProducto (id:string){
        try {
            const productoBuscado = await altaProducto(id)
            if(!productoBuscado){
                throw new Error ("producto no encontrado")
            }
            if(productoBuscado.estado){
                throw new Error ("el producto ya se encuentra activo")
            }
            const productoAlta = await altaProducto(id)
            return productoAlta
        } catch (error) {
            throw Error ((error as Error).message)            
        }
    }
    async bajaProducto(id:string){
    try {
        const productoBuscado = await bajaProducto(id)
        if (!productoBuscado){
            throw new Error ("producto no encontrado")
        }    
        if (productoBuscado.estado){
            throw new Error ("el producto ya se encuentra inactivo")
        }
        const productoBaja = await bajaProducto(id)
        return productoBaja
    } catch (error) {
        throw Error((error as Error).message)
    }
    }
    async buscarNombre (nombre:string){
        try {
            const productoBuscado = await buscarNombre(nombre)
            if(!productoBuscado){
                throw new Error ("producto no encontrado")
            }
            return productoBuscado
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }

}
export const productoServicio = new ProductoServicio()