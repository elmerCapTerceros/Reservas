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
          modificar.innerHTML = `<button onclick="document.getElementById('id01').style.display='block'" class="modificar-btn "><i class="fa fa-edit"></i></button>`;
          estado.textContent = 'Habilitado';
          console.log('biem');
        });
      })
      .catch(error => {
        console.error("Error al obtener datos:", error);
      });

      const modificarBtns = document.querySelectorAll('.modificar-btn');

  modificarBtns.forEach(btn => {
   btn.addEventListener('click', () => {
     modificarAula(btn);
      
   });
   
  });

  function modificarAula(btn) {
    // código para modificar el aula
   
  }

  

