const {Router} = require('express');
const router = new Router();
const sql = require('mssql');
const express = require('express');
const config = {
    server: 'localhost',
    user: 'andres',
    port: 1433,
   // port: 5500,
    password: 'estopa',
    //database: 'ReservaProyect',
    database: 'ReservaProyecto',
    options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    },
};

router.get("/",async(req,res)=>{
    try {
        await sql.connect(config);
    
        const result = await sql.query('SELECT codAula, Capacidad, Descripcion,estado FROM Aula');
    
        const datosAula = result.recordset; // Los datos se obtienen del resultado de la consulta
    
        res.json(datosAula);
      } catch (err) {
        console.error('Error al obtener datos de la base de datos:', err);
        res.status(500).send('Error interno del servidor');
      } finally {
        sql.close();
      }
});


router.post('/', async (req, res) => {
  try {
      const { codAula, Capacidad, Descripcion } = req.body;
      const estado = 1;

      if (!codAula || !Capacidad || !Descripcion ) {
          return res.status(400).json({ error: 'Faltan datos obligatorios' });
      }

      await sql.connect(config);

      const query = `INSERT INTO Aula (codAula, Capacidad, Descripcion,estado) VALUES ('${codAula}', ${Capacidad}, '${Descripcion}',${estado})`;
      const result = await sql.query(query);

      if (result.rowsAffected[0] === 1) {
          res.status(201).json({ success: true, message: 'Datos de aula agregados exitosamente' });
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


router.put('/:aula', async (req, res) => {

    const {aula} = req.params;
    
    const { capacidad, descripcion, estado } = req.body;
    
    try {
  
      await sql.connect(config);
      
      // Query para actualizar el aula
      const result = await sql.query`
        UPDATE Aula 
        SET Capacidad = ${capacidad}, 
            Descripcion = ${descripcion},
            estado = ${estado}  
        WHERE codAula = ${aula}
      `;
  
      // Verificar que se actualizó una fila
      if(result.rowsAffected[0] === 0) {
        return res.status(404).send('Aula no encontrada');
      }
    
  
      res.json({aula,capacidad,descripcion,habilitado});
  
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al actualizar aula');
    } finally {
      sql.close();
    }
  
  });
  


module.exports = router;