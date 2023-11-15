const express = require('express');
const app = express();
const port = 5500;// Puertos que deseas usar
const sql = require('mssql');
const cors = require('cors');


app.use(cors());

const config = {
    server: 'localhost',
    user: 'andres',
    port: 1433,
    password: 'estopa',
    database: 'ReservaProyecto',
    options: {
        "encrypt": true,
        enableArithAbort: true, // o false, según tus necesidades
         
          trustServerCertificate: true,
          
      },
  };

// Configuración de Express para servir archivos estáticos (tu página HTML)
app.use(express.static('public')); // Asumiendo que los archivos HTML están en una carpeta llamada 'public'

// Ruta para obtener los datos de la tabla 'Aula'
app.get('/obtener-datos-aula', async (req, res) => {
    try {
      await sql.connect(config);
  
      const result = await sql.query('SELECT codAula, Capacidad, Descripcion FROM Aula');
  
      const datosAula = result.recordset; // Los datos se obtienen del resultado de la consulta
  
      res.json(datosAula);
    } catch (err) {
      console.error('Error al obtener datos de la base de datos:', err);
      res.status(500).send('Error interno del servidor');
    } finally {
      sql.close();
    }
  });

  // Endpoint PUT para actualizar un aula
app.put('/aulas/:id', async (req, res) => {

  const aulaId = req.params.id;
  
  const { capacidad, descripcion } = req.body;
  
  try {

    await sql.connect(config);
    
    // Query para actualizar el aula
    const result = await sql.query`
      UPDATE Aula 
      SET Capacidad = ${capacidad}, 
          Descripcion = ${descripcion}  
      WHERE codAula = ${aulaId}
    `;

    // Verificar que se actualizó una fila
    if(result.rowsAffected[0] === 0) {
      return res.status(404).send('Aula no encontrada');
    }
      
    // Obtener el aula actualizada
    const updatedAula = await getAulaById(aulaId);

    res.json(updatedAula);

  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar aula');
  } finally {
    sql.close();
  }

});

// Función para obtener un aula por ID
async function getAulaById(id) {

  try {
    await sql.connect(config);

    const result = await sql.query`
      SELECT codAula, Capacidad, Descripcion 
      FROM Aula WHERE codAula = ${id}
    `;

    return result.recordset[0];

  } catch (error) {
    console.error(error);
  } finally {
    sql.close();
  }  
}
  
  app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
  });
