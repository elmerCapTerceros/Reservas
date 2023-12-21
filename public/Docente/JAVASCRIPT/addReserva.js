const boton = document.getElementById("botonReserva");

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
        if(reserva.estado.toLowerCase() != 'rechazado'){
            const nuevaFila = document.createElement('tr');
            nuevaFila.innerHTML = `
                <td>${reserva.nombreDocente}</td>
                <td>${reserva.motivo}</td>
                <td>${reserva.fechaReserva}</td>
                <td>${reserva.grupo}</td>
                <td>${reserva.horario}</td>
                <td>${reserva.materia}</td>
                <td>${reserva.codAula}</td>
                <td>${reserva.estado}</td>
            `;
            tablaReservas.appendChild(nuevaFila);
    switch (reserva.estado.toLowerCase()) {
        case 'pendiente':
          nuevaFila.style.backgroundColor = '#FFFF00';
          
          break;
        case 'reservado':
          nuevaFila.style.backgroundColor = '#06F803';
          break;
        case 'rechazado':
          nuevaFila.style.backgroundColor = '#FF2700';
          break;
        default:
          // Puedes agregar un color predeterminado o dejarlo sin cambios
          break;
      }
   
        }
    });
};

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

    }).then(response => response.json())
      .then(data => {
        // Actualizar la interfaz de usuario según sea necesario
        console.log('Reserva creada:', data);
        
      })
      .catch(error => {
        console.error('Error al crear reserva:', error);
      });
      mostrarReservasEnTabla();
}


const obtenerReservas = async () => {
    try {
        const response = await fetch('http://localhost:5500/api/reserva/2', {
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



boton.addEventListener('click',agregar);
mostrarReservasEnTabla();
