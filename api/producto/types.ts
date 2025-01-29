
export interface IproductoPayload{
    _id:string
    nombre:string
    categoria:string
    descripcion:string
    marca:string
    modelo:string
    precio_compra:number
    precio_venta:number
    stock:number
    stock_minimo:number
    estado:true
    imagen:string
}

type filtro_precio = "masBajo" | "masAlto";
export interface IproductoFiltro{ //el signo ? indica que es opcional poner, es como un required false
    nombre?:string,
    categoria?:string,
    marca?:string,
    modelo?:string,
    filtro_precio?: filtro_precio
    rango_precio?:string
    pagina?:string
    limite?:string;
    keyword?:string
} 
