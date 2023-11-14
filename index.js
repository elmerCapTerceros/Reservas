const express = require('express');
const app = express();
const port = 5500;
const sql = require('mssql');
const cors = require('cors');

const multer = require('multer'); // Para manejar archivos en Express
const csv = require('csv-parser'); // Para analizar archivos CSV
const fs = require('fs'); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
const config = {
    server: 'localhost',
    user: 'capTerceros',
    password: 'estopa',
    database: 'ReservaProyecto',
    options: {
        "encrypt": true,
        enableArithAbort: true,
    },
};

app.use(express.static('public'));

app.get('/obtener-datos-aula', async (req, res) => {
    try {
        await sql.connect(config);
        const result = await sql.query('SELECT codAula, Capacidad, Descripcion FROM Aula');
        const datosAula = result.recordset;
        res.json(datosAula);
    } catch (err) {
        console.error('Error al obtener datos de la base de datos:', err);
        res.status(500).send('Error interno del servidor');
    } finally {
        sql.close();
    }
});

app.post('/agregar-datos-aula', async (req, res) => {
  try {
      const { codAula, Capacidad, Descripcion } = req.body;

      if (!codAula || !Capacidad || !Descripcion) {
          return res.status(400).json({ error: 'Faltan datos obligatorios' });
      }

      await sql.connect(config);

      const query = `INSERT INTO Aula (codAula, Capacidad, Descripcion) VALUES ('${codAula}', ${Capacidad}, '${Descripcion}')`;
      const result = await sql.query(query);

      if (result.rowsAffected[0] === 1) {
          res.status(201).json({ message: 'Datos de aula agregados exitosamente' });
      } else {
          res.status(500).json({ error: 'No se pudieron agregar los datos de aula' });
      }
  } catch (err) {
      console.error('Error al agregar datos de aula a la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
      sql.close();
  }
});


app.post('/procesar-archivo-csv', upload.single('archivo'), (req, res) => {
  const file = req.file;
  if (!file) {
      return res.status(400).json({ error: 'No se ha proporcionado un archivo CSV' });
  }

  const data = file.buffer.toString('utf8');

  
  const results = [];
  fs.createReadStream(data)
      .pipe(csv())
      .on('data', (row) => {
          results.push(row);
      })
      .on('end', () => {
        

          res.status(200).json({ message: 'Datos agregados desde el archivo CSV' });
      });
});

app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
});