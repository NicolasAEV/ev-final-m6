import express from 'express'
import fs from 'fs'
//importamos las funciones
import { leerMascotas, leerMascotasPorId } from '../utils/utils.js';
const router = express.Router();


router.get('/',(req,res)=>{
    let datos = leerMascotas();
    res.render("inicio",{
        title : 'inicio',
        mascotas : datos.mascotas
    })
})
router.get('/detalle/:id',(req,res)=>{
    let { id } = req.params;
    let dato = leerMascotasPorId(id);
    console.log(dato)
    res.render("detalle",{
        title : 'detalle mascota',
        dato
    })
})
router.get('/formulario',(req,res)=>{
    res.render("formulario",{
        title : 'inicio'
    })
})


export default router;