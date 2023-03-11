const formulario = document.querySelector('#eliminarMascota');
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    let mascota = document.querySelector('#mascota')

    fetch("http://localhost:3000/api/mascotas/" + mascota.value, {
        method: "delete"
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.code != 200) {
                alert(result.message)
            } else {
                alert("Mascota eliminada.")
                location.href = "/"
            }
        })
        //en caso de error imprimimos el error
        .catch((error) => console.log("error", error));

})

const formularioRun = document.querySelector('#eliminarPorRun');
formularioRun.addEventListener('submit', (e) => {
    e.preventDefault();

    let run = document.querySelector('#run')

    fetch("http://localhost:3000/api/propietario/" + run.value, {
        method: "delete"
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.code != 200) {
                alert(result.message)
            } else {
                alert("Mascota eliminada.")
                location.href = "/"
            }
        })
        //en caso de error imprimimos el error
        .catch((error) => console.log("error", error));

})
const eliminarMascota = (nombre) => {

            //realizarmos una peticion fetch al endpoint con la url
    fetch("http://localhost:3000/mascotas/" + nombre, {
        method: "delete"
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.code != 200) {
                alert(result.message)
            } else {
                alert("Mascota eliminada.")
                location.href = "/"
            }
        })
        //en caso de error imprimimos el error
        .catch((error) => console.log("error", error));


    //se rescata el valor del nombre
    // let nombre = document.querySelector('#mascota').value;

};


