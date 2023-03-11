//importamos el paquetes filesystem 
import fs from 'fs';
//muestra todas las mascotas
export const leerMascotas = () => {
    //leemos el archivo y lo guardamos en una variable
    let data = fs.readFileSync("mascotas.json", "utf8");
    //retornamos la variable
    return JSON.parse(data);
}
//muestra los detalles de la mascota
export const leerMascotasPorId = (id) => {
    //leemos el archivo y lo guardamos en una variable
    let data = fs.readFileSync("mascotas.json", "utf8");
    //parseamos los datos del archivo
    let mascotas = JSON.parse(data);
    //y buscamos con un .find el elemento con el mismo id
    let mascotasFiltradas = mascotas.mascotas.find(mascota => mascota.id == id);
    //retornamos el valor encontrado
    return mascotasFiltradas;
}

export const guardarMascota = (mascota) => {
    //reutilizamos la funcion leer mascotas
    let data = leerMascotas();
    //recibimos los datos de la mascota y realizamos un push para guardarlo
    data.mascotas.push(mascota);
    //singresamos el valor en el archivo
    fs.writeFileSync("mascotas.json", JSON.stringify(data, null, 4), 'utf8');
}

export const eliminarMascota = (nombre) => {
    //reutilizamos la funcion leer mascotas
    let data = leerMascotas();
    //y buscamos con un .find el elemento con el mismo nombre
    let found = data.mascotas.find(mascota => mascota.nombre == nombre);
    //en caso de encontramos filtramos todas las mascotas que no tengan ese nombre
    //de preferencia esto deberia realizarse por el id no por el nombre
    if(found){
        let filterMascotas = data.mascotas.filter(mascota => mascota.nombre != nombre);
        //guardamos los datos filtrados en la variable data
        data.mascotas = filterMascotas;
        //y sobreescribimos los datos de el archivo json
        fs.writeFileSync("mascotas.json", JSON.stringify(data, null, 4), 'utf8');
        return true;
    }else{
        return false;
    }
}

export const eliminarMascotaPorRun = (run) => {
    //reutilizamos la funcion leer mascotas
    let data = leerMascotas();
    //y buscamos con un .find el elemento con el mismo run
    let found = data.mascotas.find(mascota => mascota.propietario.run == run);
        //en caso de encontramos filtramos todas las mascotas con dueño que no tengan ese run
    if(found){
        let filterMascotas = data.mascotas.filter(mascota => mascota.propietario.run != run);
        //guardamos los datos filtrados en la variable data
        data.mascotas = filterMascotas;
        //y sobreescribimos los datos de el archivo json
        fs.writeFileSync("mascotas.json", JSON.stringify(data, null, 4), 'utf8');
        return true;
    }else{
        return false;
    }
}