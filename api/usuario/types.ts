//en esta interface agrego los campos que en mi opinion son necesarios para trabajar despues
export interface iUsuarioPayload{
   _id:string,
    nombre :string
    apellido :string
    fecha_nacimiento:Date
    email :string
    contraseña : string
    telefono: number
    direccion: string
}