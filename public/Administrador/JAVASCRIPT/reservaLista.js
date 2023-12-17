fetch('http://localhost:5500/api/reserva')
  .then(response => response.json())
  .then(data => {
    // Ordenar los datos por estado, colocando los "pendiente" primero
    data.sort((a, b) => {
      if (a.estado.toLowerCase() === 'pendiente') return -1;
      if (b.estado.toLowerCase() === 'pendiente') return 1;
      return 0;
    });

    const table = document.getElementById("myTable");

    data.forEach(item => {
      const newRow = table.insertRow(-1);
      const codigo = newRow.insertCell(0);
      const docente = newRow.insertCell(1);
      const motivo = newRow.insertCell(2);
      const fecha = newRow.insertCell(3);
      const grupo = newRow.insertCell(4);
      const horario = newRow.insertCell(5);
      const materia = newRow.insertCell(6);
      const aula = newRow.insertCell(7);
      const estado = newRow.insertCell(8);
       
      codigo.textContent = item.codReserva;
      docente.textContent = item.nombreDocente;
      motivo.textContent = item.motivo;
      fecha.textContent = item.fechaReserva;
      grupo.textContent = item.grupo;
      horario.textContent = item.horario;
      materia.textContent = item.materia;
      aula.textContent =  item.codAula;

      estado.textContent = item.estado;
      document.getElementById('tituloModal').textContent = item.codReserva;
      // Cambiar el color de fondo según el estado
      switch (item.estado.toLowerCase()) {
        case 'pendiente':
          newRow.style.backgroundColor = '#FFFF00';
          estado.innerHTML = `<button onclick="abrirModal(this)" class="w3-button  w3-round-large w3-orange">pendiente</button>`;
          
          break;
        case 'reservado':
          newRow.style.backgroundColor = '#06F803';
          break;
        case 'rechazado':
          newRow.style.backgroundColor = '#FF2700';
          break;
        default:
          // Puedes agregar un color predeterminado o dejarlo sin cambios
          break;
      }
    });

  })
  .catch(error => {
    console.error("Error al obtener datos:", error);
  });



  const abrirModal = (button) => {
    const row = button.closest('tr');
    const codigo = row.cells[0].textContent;
    

    document.getElementById('tituloModal').textContent = codigo;
 
  
    // Mostrar el modal
    document.getElementById('id01').style.display = 'block';
  };
  


  
  const contenidoform = () => {
    const codReserva = document.getElementById('tituloModal').textContent;
    const estado = "Reservado";
    // Enviar la solicitud PUT al servidor
    fetch(`http://localhost:5500/api/reserva/${codReserva}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ estado }), // Corregir el campo que estás actualizando
    })
      .then(response => response.json())
      .then(data => {
        // Actualizar la interfaz de usuario según sea necesario
        console.log('Solicitud actualizada:', data);
        location.reload(true);
      })
      .catch(error => {
        console.error('Error al actualizar solicitud:', error);
      });

   
  };

  const boton = document.getElementById("aceptar");
  boton.addEventListener('click', contenidoform);