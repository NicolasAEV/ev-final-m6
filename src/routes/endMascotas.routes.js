import express from 'express'
import fs from 'fs'
import { v4 as uuid } from 'uuid';
//importamos las funciones
import { leerMascotas, leerMascotasPorId,guardarMascota,eliminarMascota,eliminarMascotaPorRun } from '../utils/utils.js';
const router = express.Router();

//endpoints
router.get('/api/mascotas',(req,res)=>{
    //creamos un try catch en caso de error
    try{
         //llamamos la funcion buscar todas las mascotas
        let datos = leerMascotas();
        //reeenviamos los datos obtenidos
        res.json({code: 200, data: datos});
    }catch{
        res.status(500).json({code: 500, message:"Ha ocurrido un error al buscar las mascotas."})
    }
 
}).post('/api/mascotas',(req,res)=>{
    //creamos un try catch en caso de error
    try{
        //recibimos los datos atravez de body
        let { mascota, run, propietario } = req.body;
        //en caso de que algun dato no sea verdadero o exista enviaremos un error 
        if(!mascota || !run || !propietario){
            return res.status(400).json({code: 400, message:"debes enviar todos los datos necesarios"})
         }
         //creamos un arreglo de objetos e insertamos el id con uuid
         let newPets = {
         id: uuid().slice(0,6),
         nombre: mascota,
         propietario: {
                 run,
                 nombre:propietario
             }
         }
         //llamamos la funcion guardar mascota
         guardarMascota(newPets);
         res.json({code: 201, message: `Mascota ${mascota} creada correctamente`})
    }catch{
        res.status(500).json({code: 500, message:"erro al guardar la mascota"})
    }
}).delete('/api/mascotas/:nombre',(req,res)=>{
    //creamos un try catch en caso de error
    try{
        //recibimos el parametro nombre 
        let { nombre } = req.params;
        //invocamos la funcion en caso de que esta sucesa reenviaremos la informacion
        if(eliminarMascota(nombre)){
           res.json({code: 200, message:`Mascota ${nombre} eliminada correctamete`}) 
        }else{
            //en caso de no encontrada enviamos un codigo 400
            res.status(400).json({code: 400, message:`Mascota  con nombre ${nombre} no existe en el sistema.`})
        }
        
    }catch(error){
        //error 500 si no se logra 
        res.status(500).json({code: 500, message:"Ha ocurrido un error al eliminar las mascotas."})
    }
})

export default router;