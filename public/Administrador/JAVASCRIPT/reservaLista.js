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
      const docente = newRow.insertCell(0);
      const motivo = newRow.insertCell(1);
      const fecha = newRow.insertCell(2);
      const grupo = newRow.insertCell(3);
      const horario = newRow.insertCell(4);
      const materia = newRow.insertCell(5);
      const aula = newRow.insertCell(6);
      const estado = newRow.insertCell(7);

      docente.textContent = item.nombreDocente;
      motivo.textContent = item.motivo;
      fecha.textContent = item.fechaReserva;
      grupo.textContent = item.grupo;
      horario.textContent = item.horario;
      materia.textContent = item.materia;
      aula.textContent =  item.codAula;

      estado.textContent = item.estado;

      // Cambiar el color de fondo según el estado
      switch (item.estado.toLowerCase()) {
        case 'pendiente':
          newRow.style.backgroundColor = '#FFFF00';
          estado.innerHTML = `<button onclick="document.getElementById('id01').style.display = 'block'" class="modificar-btn">pendiente</button>`;
          
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

 

