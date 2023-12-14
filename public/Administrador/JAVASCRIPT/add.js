//fetch('http://localhost:5500/obtener-datos-aula').then(response => response.json()).then(data => console.log(data));


const boton = document.getElementById("botons");
const agregar = ()=>{
    let codAula=document.getElementById('codAula').value;
    let Capacidad=document.getElementById('Capacidad').value;
    let Descripcion=document.getElementById('Descripcion').value;

    const nuevo = {
        codAula,
        Capacidad,
        Descripcion
    }
    fetch('http://localhost:5500/api/aula', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevo)
    })
}

boton.addEventListener('click',agregar);

