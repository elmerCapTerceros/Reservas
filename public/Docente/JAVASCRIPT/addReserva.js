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
    fetch('http://localhost:5500/api/reserva', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(nuevo)
    })
}


const obtenerReservas = async () => {
    try {
        const response = await fetch('http://localhost:5500/api/reserva', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            // Si la respuesta no está en el rango 200-299, lanzamos un error
            throw new Error(`Error al obtener reservas: ${response.status} - ${response.statusText}`);
        }

        const reservas = await response.json();
        return reservas;
    } catch (error) {
        console.error('Error al obtener reservas:', error.message);
        throw error; // Lanzamos el error nuevamente para que el código que llama pueda manejarlo
    }
};


const mostrarReservasEnTabla = async () => {
    const tablaReservas = document.getElementById('tablaReserva');
    const reservas = await obtenerReservas();
    tablaReservas.innerHTML = `
        <tr>
            <th>Docente</th>
            <th>Motivo</th>
            <th>Fecha de Reserva</th>
            <th>Grupo</th>
            <th>Horario</th>
            <th>Materia</th>
            <th>Aula</th>
            <th>Estado</th>
        </tr>
    `;
    reservas.forEach(reserva => {
        const nuevaFila = `
            <tr>
                <td>${reserva.nombreDocente}</td>
                <td>${reserva.motivo}</td>
                <td>${reserva.fechaReserva}</td>
                <td>${reserva.grupo}</td>
                <td>${reserva.horario}</td>
                <td>${reserva.materia}</td>
                <td>${reserva.codAula}</td>
                <td>${reserva.estado}</td>
            </tr>
        `;
        tablaReservas.innerHTML += nuevaFila;
    });
};

boton.addEventListener('click',agregar);
