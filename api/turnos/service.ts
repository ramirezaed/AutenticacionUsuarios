import { turnoDao } from "./dao";
import Turno from "./model";
import QRCode from "qrcode"; 
import { Iturno } from "./type";

const {
    crearTurno, buscarPorcodigo,mostrarTodos, buscarPorFecha, cancelarTurno
}=turnoDao

class TurnoServicio {
    async crearTurno(turno: Iturno) {
        try {
            // Convertir fecha a Date, pero usando la zona horaria local (Argentina)
            const fechaTurno = new Date(turno.fecha); // Fecha de entrada, asumida en UTC   
            
            // Definir las franjas horarias específicas (en UTC-3 para Argentina)
            const horarios = [
                new Date(fechaTurno.getTime()),  // Copia para las franjas horarias
                new Date(fechaTurno.getTime()),
                new Date(fechaTurno.getTime()),
                new Date(fechaTurno.getTime())
            ];
            // Asignar la hora específica para cada franja horaria
            horarios[0].setUTCHours(9, 0, 0, 0);   // 9:00 AM en UTC-3
            horarios[1].setUTCHours(11, 0, 0, 0);  // 11:00 AM en UTC-3
            horarios[2].setUTCHours(16, 0, 0, 0);  // 4:00 PM en UTC-3
            horarios[3].setUTCHours(17, 30, 0, 0); // 5:30 PM en UTC-3
    
            // Verificar cuántos turnos existen para cada franja horaria
            for (const hora of horarios) {
                const turnosExistentes = await Turno.countDocuments({
                    fecha: hora
                });
    
                if (turnosExistentes === 0) {
                    // Asignar el turno al primer horario disponible
                    turno.fecha = hora;
                    // Generar un código único y crear el QR
                    const codigo = `TURNO-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
                    const qrData = `Codigo: ${codigo}, Nombre: ${turno.nombre}, Vehiculo: ${turno.matricula}, Fechayhora: ${turno.fecha}, Servicio: ${turno.servicio}`;
                    const qrCode = await QRCode.toDataURL(qrData);
                    // Asignar el QR al turno
                    turno.codigo_turno = qrCode;
                    // Crear el turno en la base de datos
                    const nuevoTurno = await crearTurno(turno);
                    if (!nuevoTurno) {
                        throw new Error('Error al generar el turno');
                    }  
                    // Ajustar la hora del turno a la zona horaria de Argentina (UTC-3)
                    const timezoneOffset = -3 * 60; // Argentina UTC-3 en minutos
                    nuevoTurno.fecha.setMinutes(nuevoTurno.fecha.getMinutes() + nuevoTurno.fecha.getTimezoneOffset() + timezoneOffset); 
                    return nuevoTurno; // Retornar el turno recién creado con hora local
                }
            }
    
            // Si todas las franjas horarias están ocupadas
            throw new Error('No hay más turnos disponibles para esta fecha');
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
    async mostrarTodos(){
        try {
            const turnos = mostrarTodos()
            if (!turnos){
                throw new Error ("no hay turnos")
            }
            return turnos
        } catch (error) {
            throw Error ((error as Error).message)
        }
    }
    async buscarPorCodigo(codigo:string){
        try {
            if(!codigo){
                throw new Error("error al buscar el codigo")
            }
            const turno = await buscarPorcodigo(codigo)
            if (!turno){
                throw new Error ("turno no encontrado")
            }
            return turno
        } catch (error) {
            throw Error ((error as Error).message);
        }

    }
    async buscarPorFecha(fecha: Date) {
        try {
            if (!fecha) {
                throw new Error("Error con la fecha");
            }
    
            // Convertir la fecha para asegurarse de que sea un rango completo del día (sin importar hora)
            const fechaInicio = new Date(fecha);
            fechaInicio.setHours(0, 0, 0, 0); // Establece la hora a las 00:00:00 para el inicio del día
            const fechaFin = new Date(fecha);
            fechaFin.setHours(23, 59, 59, 999); // Establece la hora a las 23:59:59.999 para el final del día
    
            // Buscar turnos dentro de ese rango de fecha (todo el día)
            const turnosEncontrados = await Turno.find({
                fecha: { $gte: fechaInicio, $lte: fechaFin }
            });
    
            if (turnosEncontrados.length === 0) {
                throw new Error("No hay turnos en esta fecha");
            }
    
            return turnosEncontrados;
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
    async cancelarTurno(codigo_turno: string){
        try {
            const Verificar = await Turno.findOne({codigo_turno})
            if(!Verificar){
                throw new Error("turno no encontrado")
            }
            const cancelar = await cancelarTurno(codigo_turno)
            return cancelar                
        } catch (error) {
            throw Error ((error as Error).message)
            }
        }

}
export const turnoServicio=new TurnoServicio()