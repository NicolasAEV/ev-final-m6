import express from 'express'
import fs from 'fs'
//importamos las funciones
import { leerMascotas, leerMascotasPorId,guardarMascota,eliminarMascota,eliminarMascotaPorRun } from '../utils/utils.js';
const router = express.Router();

//endpoints
router.get('/api/propietario/:run',(req,res)=>{
    //creamos un try catch en caso de error
    try{
        let {run} = req.params;
         //llamamos la funcion buscar todas las mascotas
        let datos = leerMascotas();
        //reeenviamos los datos obtenidos
        let mascotaspropietario= data.mascotas.filter(mascota => mascota.propietario.run == run)
        res.json({code: 200, data: mascotaspropietario});
    }catch{
        res.status(500).json({code: 500, message:"Ha ocurrido un error al buscar las mascotas."})
    }
 
}).delete('/api/propietario/:run',(req,res)=>{
    //creamos un try catch en caso de error
    try{
        //recibimos el parametro nombre 
        let { run } = req.params;
        //invocamos la funcion en caso de que esta sucesa reenviaremos la informacion
        if(eliminarMascotaPorRun(run)){
           res.json({code: 200, message:`mascotas con propietario run ${run} han sido eliminadas exitosamente`}) 
        }else{
            //en caso de no encontrada enviamos un codigo 400
            res.status(400).json({code: 400, message:`Mascota  con nombre ${run} no existe en el sistema.`})
        }
        
    }catch(error){
        //error 500 si no se logra 
        res.status(500).json({code: 500, message:"Ha ocurrido un error al eliminar las mascotas."})
    }
})

export default router;