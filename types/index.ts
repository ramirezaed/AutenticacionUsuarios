export type UsuarioRol = "admin" | "cliente" | "vendedor";

export interface Iusuario{
    _id: string| undefined;
    nombre :string
    apellido :string
    fecha_nacimiento:Date
    email :string
    contraseña : string
    telefono: Number
    rol_usuario : UsuarioRol
    estado: boolean
}

export interface Iproducto{
    _id?:string
    nombre?:string
    categoria?:string
    descripcion?:string
    marca?:string
    modelo?:string
    precio_compra?:number
    precio_venta?:number
    stock?:number
    stock_minimo?:number
    estado?:true
    imagen?:string
}

export interface Icarrito{
    producto:{producto_id: string; cantidad:number}[]
    total: number
}