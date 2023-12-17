const boton = document.getElementById("botonReserva");
const agregar = ()=>{
    let nombreDocente=document.getElementById('nombreDocente').value;
    let motivo=document.getElementById('motivo').value;
    let fechaReserva=document.getElementById('fechaReserva').value;
    let grupo=document.getElementById('grupo').value;
    let horario=document.getElementById('horario').value;
    let materia=document.getElementById('materia').value;
    let codAula=document.getElementById('codAula').value;

    const nuevo = {
        nombreDocente,
        motivo,
        fechaReserva,
        grupo,
        horario,
        materia,
        codAula
    }
    fetch('http://localhost:5500/nuevaReserva', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevo)
    })
}

boton.addEventListener('click',agregar);
