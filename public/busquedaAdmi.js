const botonmodal = document.getElementById("modificar");


fetch('http://localhost:5500/obtener-datos-aula')
      .then(response => response.json())
      .then(data => {
        const table = document.getElementById("myTable");

        data.forEach(item => {
          const newRow = table.insertRow(-1);
          const codAulaCell = newRow.insertCell(0);
          const capacidadCell = newRow.insertCell(1);
          const descripcionCell = newRow.insertCell(2);
          const modificar = newRow.insertCell(3);
          const estado = newRow.insertCell(4);

          codAulaCell.textContent = item.codAula;
          capacidadCell.textContent = item.Capacidad + " alumnos";
          descripcionCell.textContent = item.Descripcion;
          modificar.innerHTML = `<button onclick="abrirModal(this)" class="modificar-btn"><i class="fa fa-edit"></i></button>`;
          estado.textContent = 'Habilitado';
          console.log('biem');
        });
      })
      .catch(error => {
        console.error("Error al obtener datos:", error);
      });

      
  

  function modificarAula(btn) {
    // código para modificar el aula
   
  }
  //const id = '';

  const abrirModal = (button) => {
    const row = button.closest('tr');
    const titulo = row.cells[0].textContent;
    const capacidad = row.cells[1].textContent.split(' ')[0]; // Obtener solo el número de capacidad
    const descripcion = row.cells[2].textContent;
 //   id = titulo;
  
    // Asignar los valores al formulario en el modal
    document.getElementById('capacidad').value = capacidad;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('tituloModal').textContent = 'Actualizar aula : '+titulo;
  
    // Mostrar el modal
    document.getElementById('id01').style.display = 'block';
  };
  
  const modificar = document.querySelectorAll('.modificar-btn');
  
  modificar.forEach(btn => {
    btn.addEventListener('click', () => {
      abrirModal(btn);
    });
  });



  const contenidoform = () => {
    const Capacidad = document.getElementById('capacidad').value;
    const Descripcion = document.getElementById('descripcion').value;
   // const codAula = '690B';
  
    // Enviar la solicitud PUT al servidor
    fetch(`http://localhost:5500/aulas/${codAula}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
  body: JSON.stringify({ Capacidad, Descripcion }),
    })
      .then(response => response.json())
      .then(data => {
        // Actualizar la interfaz de usuario según sea necesario
        console.log('Aula actualizada:', data);
      })
      .catch(error => {
        console.error('Error al actualizar aula:', error);
      });
  };
  
  const boton = document.getElementById("modificar");
  boton.addEventListener('click', contenidoform);
  
