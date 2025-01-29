import {config} from "dotenv"
import { sign } from "jsonwebtoken";
import { compare } from "bcrypt"
import { usuarioDao } from "./dao";
import { Iusuario, UsuarioRol } from "../../types";
import Usuario from "./model";
import { iUsuarioPayload } from "./types";

config();

const {
        crearUsuario, editarUsuario, bajaUsuario, altaUsuario, buscarPorId, buscarPorEmail,mostrarTodos,
        mostrarActivos, mostrarInactivos, cambiarRol, todosPaginados
    } = usuarioDao;

class UsuarioServicio {
    
    async crearUsuario(user: Iusuario){
        try {
            const email = user.email
            const verificarCorreo= await Usuario.findOne({email})
           if (verificarCorreo){
            throw new Error("Ya se encuentra registrado un usuario con esa dirreccin de correo electronico");
            }
        const nuevoUsuario = await crearUsuario(user)
        return nuevoUsuario          
        } catch (error) {
            throw Error ((error as Error).message)
            
        }
    }
    async editarUsuario (userId:string, usuario: iUsuarioPayload){
        const {nombre, apellido,fecha_nacimiento, email, contraseña, telefono, direccion} = usuario
        const dbPayLoad={
           ...( nombre? {nombre}:{}),                    //si nombre? no esta vacio, agrego {nombre} 
           ...( apellido?  {apellido}: {}),
           ...( fecha_nacimiento? {fecha_nacimiento}:{}),
           ...( email? {email}: {}),
           ...( contraseña? {contraseña}:{}),
           ...( telefono? {telefono}:{}),
           ...( direccion? {telefono}:{}),
        };
       
        try {
          //   const verificar = await Usuario.findById(userId)
             if (!userId){
                 throw new Error ("Usuario no encontrado")
             }
            const  usuarioEditado = await editarUsuario(userId, usuario)
            return usuarioEditado
        } catch (error) {
            throw Error ((error as Error).message)
            
        }
    }
    async bajaUsuario(userId:string){
        try {
            const usuarioBuscado =await bajaUsuario(userId)

            if(!usuarioBuscado){
                throw new Error("usuario no encontrado")
            }
            if(usuarioBuscado){
                throw new Error ("el usuario ya se encuenta inactivo")
            }
            const bajaUser = await bajaUsuario(userId)
            return bajaUser
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async altaUsuario (userId:string){
        try {
            const usuarioBuscado = await altaUsuario(userId)
            if(!usuarioBuscado){
            throw new Error ("el usuario ya se encuentra activo")
            }      
            if (usuarioBuscado.estado){
                throw new Error ("usuario ya se encuentra activo")
            }
            const altaUser =await altaUsuario(userId)
            return altaUser
            }catch (error) {
              throw Error ((error as Error).message)        
            }
    }
    async mostrarTodos (){
        try {
            const mostrar =await mostrarTodos()
            if (!mostrar || mostrar.length === 0){
                throw new Error ("no hay usuarios registrados")
            }
            return mostrar
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async buscarPorId (userId: string){
        try {
            const usuario = userId
            if (!usuario || usuario.length === 0){
                throw new Error ("no se encontro ningun usuario")
            }
            const buscado = await buscarPorId(userId);
            return (buscado)
        } catch (error) {
            throw Error((error as Error).message)
        }
    }
    async todosPaginados(pagina="1", limite="10"){
        try {
            const usuarios =await todosPaginados(pagina, limite)
            if (!usuarios){
                throw new Error("no hay usuarios");
            }
            return usuarios
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async buscarPorEmail(email:string){
        //el metodo findone devuelve null si no encuentra,
        try {
            const buscado = await buscarPorEmail(email)           
            if (!buscado ){ 
                throw new Error("usuario no encontrado");     
                //aca busca en el dao el email, si no encuentra me devuelve el eror       
            }
            return(buscado)        
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async mostrarActivos(){
    try {
        const activos = await mostrarActivos()
        if (!activos || activos.length === 0){
             throw new Error ("no hay usuario activos")
        }
        return activos
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async mostrarInactivos(){
        try {
           const inactivos = await mostrarInactivos()
           if (!inactivos || inactivos.length === 0) {
           throw new Error ("no hay usuarios inactivos")
           }
         return inactivos 
        } catch (error) {
            throw Error ((error as Error).message)
            
        }
    }
    async cambiarRol(userId:string, rol:UsuarioRol){
        try {
          //  const // verificar = Usuario.findById(userId)
            if (!userId){
                throw new Error("usuario no encontrado")
            }
            if (!rol){
                throw new Error ("error al cargar el rol")
            }
            const actualizarRol = await cambiarRol(userId, rol)
             if (!actualizarRol){
                  throw new Error ("error aca al modificar rol del usuario")
              }
            return actualizarRol
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async login (usuario: {email:string, contraseña: string}){
        try {
        const {email, contraseña}= usuario
        const verificarCorreo = await buscarPorEmail(email)
        if (!verificarCorreo){
            throw new Error ("correo o contraseña incorrecta")
            }
        const verficarContraseña = await compare(contraseña, verificarCorreo.contraseña)
        if(!verficarContraseña){
            throw new Error ("contraseña o correo incorrectos")
            }
        const userPayload = { //esto es lo que me devuelve cuado inicio sesion
            id: verificarCorreo._id,
            nombre: verificarCorreo.nombre,
            correo: verificarCorreo.email,
            rol_usuario:verificarCorreo.rol_usuario,
            estado:verificarCorreo.estado

            
            }
        const token = sign (userPayload, process.env.TOKEN_SECRET !,{expiresIn: "1h"},)
            return {userPayload, token}
        }catch(error){
            throw Error ((error as Error).message)
        }
    }
}

export const usuarioServicio = new UsuarioServicio()