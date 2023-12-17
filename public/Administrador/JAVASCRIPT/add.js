//fetch('http://localhost:5500/obtener-datos-aula').then(response => response.json()).then(data => console.log(data));


const boton = document.getElementById("botons");
const agregar = (event) => {
  event.preventDefault();
  let codAula = document.getElementById('codAula').value;
  let Capacidad = document.getElementById('Capacidad').value;
  let Descripcion = document.getElementById('Descripcion').value;

  const nuevo = {
    codAula,
    Capacidad,
    Descripcion
  };

  fetch('http://localhost:5500/api/aula', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevo)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Respuesta del servidor:', data);

    if (data.success) {
     mostrarModalExito();
     document.getElementById('Capacidad').value = '';
     document.getElementById('Descripcion').value = '';
     document.getElementById('codAula').value = '';
     
    }
  })
  .catch(error => {
    console.error('Error al agregar el aula:', error);
  });

 
};

    
 


const mostrarModalExito = () => {

        const modalExito = document.getElementById("id01");
        modalExito.style.display = 'block';
    
   
}
boton.addEventListener('click',agregar);

