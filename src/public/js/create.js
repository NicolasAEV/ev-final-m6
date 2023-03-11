const formulario = document.querySelector('#formMascotas')
let nombreMascota = document.querySelector('#nombreMascota');
let nombrePropietario = document.querySelector('#nombrePropietario');
let runPropietario = document.querySelector('#runPropietario');

formulario.addEventListener("submit", (event) => {
    event.preventDefault();
    //console.log("Capturando evento submit")
    const headers = new Headers();
    headers.append("Content-Type", "application/json");

    let nuevaMascota = {
        mascota: nombreMascota.value,
        propietario: nombrePropietario.value,
        run: runPropietario.value
    }

    fetch("http://localhost:3000/api/mascotas", {
        method: "post",
        headers,
        body: JSON.stringify(nuevaMascota),
        redirect: "follow"
    }).then(response => response.json())
    .then(data => {
        if(data.code != 201){
            alert(data.message)
        }else {
            alert("Mascota agregada correctamente.")
            location.href ="/"
        }
    }).catch(error => {
        console.log(error)
    })
    

})