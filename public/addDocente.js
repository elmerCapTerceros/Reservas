
const boton = document.getElementById("boton");

const agregar = () => {
  let codDocente = document.getElementById('codDocente').value;
  let Nombre = document.getElementById('Nombre').value;
  let Apellido = document.getElementById('Apellido').value;

  const nuevo = {
    codDocente,
    Nombre,
    Apellido
  };

  fetch('http://localhost:5500/api/docente', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevo)
  })
  .then(response => {
    // Verifica si la solicitud fue exitosa (código de respuesta 2xx)
    if (!response.ok) {
      throw new Error('Error al agregar el docente');
    }

    // Aquí puedes realizar acciones adicionales después de una solicitud exitosa
    
  });
  
};

boton.addEventListener('click', agregar);
