const botonmodal = document.getElementById("modificar");


fetch('http://localhost:5500/api/aula')
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
          
          let habilitado = "Deshabilitado";

          if(item.habilitado ==true ){
            habilitado = "habilitado";
          }
          codAulaCell.textContent = item.codAula;
          capacidadCell.textContent = item.Capacidad + " alumnos";
          descripcionCell.textContent = item.Descripcion;
          modificar.innerHTML = `<button onclick="abrirModal(this)" class="modificar-btn"><i class="fa fa-edit"></i></button>`;
          estado.textContent = habilitado;
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
    const habilitado = row.cells[4].textContent.split(' ')[0];
 //   id = titulo;
  
    // Asignar los valores al formulario en el modal
    document.getElementById('capacidad').value = capacidad;
    document.getElementById('descripcion').value = descripcion;
    document.getElementById('tituloModal').textContent = titulo;
    document.getElementById('habilitado').textContent = habilitado;
  
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
    const capacidad = document.getElementById('capacidad').value;
    const descripcion = document.getElementById('descripcion').value;
    const codAula = document.getElementById('tituloModal').textContent;
    const estado = document.getElementById('habilitado').value;
    // Enviar la solicitud PUT al servidor
    fetch(`http://localhost:5500/api/aula/${codAula}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
  body: JSON.stringify({ capacidad, descripcion,estado }),
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
  
