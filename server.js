const express = require('express');
const app = express();
const port = 5500;// Puertos que deseas usar
const sql = require('mssql');
const cors = require('cors');


app.use(cors());

const config = {
    server: 'localhost',
    user: 'andres',
    password: 'estopa',
    database: 'ReservaProyecto',
    options: {
        "encrypt": true,
        enableArithAbort: true, // o false, según tus necesidades
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
  
  app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
  });
