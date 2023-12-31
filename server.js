
const aulaRoutes = require("./public/routes/aula.js");
const docenteRoutes = require("./public/routes/docente.js");
const reservaRoutes = require("./public/routes/reserva.js");
const express = require('express');
const app = express();
const port = 5500;// Puertos que deseas usar
const sql = require('mssql');
const cors = require('cors');
const morgan = require('morgan');


const jwt = require('jsonwebtoken');

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));


app.use(cors());
app.use(express.json());

const config = {
    server: 'localhost',
    user: 'andres',
    port: 1433,
    password: 'estopa',
    //database: 'ReservaProyect', //mi base de datos
    database: 'ReservaProyecto',
    options: {
        "encrypt": true,
        enableArithAbort: true, // o false, según tus necesidades
         
          trustServerCertificate: true,
          
      },
  };


  app.use(express.static('public'));
  app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
  });

  app.use("/api/aula",aulaRoutes);
  app.use("/api/docente",docenteRoutes);
  app.use("/api/reserva",reservaRoutes);
// Ruta para obtener los datos de la tabla 'Aula'
/** 
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
  */

  // Endpoint PUT para actualizar un aula
/** 
app.put('/aulas/:aula', async (req, res) => {

  const aula = req.params;
  
  const { capacidad, descripcion } = req.body;
  
  try {

    await sql.connect(config);
    
    // Query para actualizar el aula
    const result = await sql.query`
      UPDATE Aula 
      SET Capacidad = ${capacidad}, 
          Descripcion = ${descripcion}  
      WHERE codAula = ${aula}
    `;

    // Verificar que se actualizó una fila
    if(result.rowsAffected[0] === 0) {
      return res.status(404).send('Aula no encontrada');
    }
  

    res.json({actualizado});

  } catch (err) {
    console.error(err);
    res.status(500).send('Error al actualizar aula');
  } finally {
    sql.close();
  }

});
**/
/** 
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
*/

/**
app.post('/codDocente', async (req, res) => {
  try {
      const { codDocente, Nombre, Apellido} = req.body;

      if (!Nombre || !Apellido || !codDocente) {
          return res.status(400).json({ error: 'Faltan datos obligatorios ;;' });
      }

      await sql.connect(config);

      const query = `INSERT INTO Docente (codDocente, Nombre, Apellido) VALUES ('${codDocente}', '${Nombre}', '${Apellido}')`;
      const result = await sql.query(query);
      const token = jwt.sign({codDocente,Nombre,Apellido}, 'miSecreto', {
        expiresIn: 60 * 60 * 24
      });
      console.log('Token generado:', token);

      if (result.rowsAffected[0] === 1) {
      
          res.status(201).json({ message: 'Datos de docente agregados exitosamente:: ' ,token});
        
      } else {
          res.status(500).json({ error: 'No se pudieron agregar los datos de docente' });
      }
  } catch (err) {
      console.error('Error al agregar datos de aula a la base de datos:', err);
      res.status(500).json({ error: 'Error interno del servidor' });
  } finally {
      
  }
  
});
 */
/** 
app.get('/prueba',(req,res,next)=>{
  const token = req.headers['x-acces-token'];
  if(!token){
    return res.status(401).json({
      message: 'no pasaste un token'
    });
  }
 
  const decoded =jwt.verify(token,'miSecreto');
  console.log(decoded);
  res.json('tienes autorizacion');
})
*/

  app.listen(port, () => {
    console.log(`Servidor en ejecución en http://localhost:${port}`);
  });
