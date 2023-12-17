const {Router} = require('express');
const router = new Router();
const sql = require('mssql');
const express = require('express');
const config = {
    server: 'localhost',
    user: 'andres',
    port: 1433,
    password: 'estopa',
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
        
        const result = await sql.query('SELECT codReserva,nombreDocente, motivo, fechaReserva, grupo, horario, materia, codAula, estado FROM Reserva');
    
        const datosReserva = result.recordset; // Los datos se obtienen del resultado de la consulta
    
        res.json(datosReserva);
      } catch (err) {
        console.error('Error al obtener datos de la base de datos:', err);
        res.status(500).send('Error interno del servidor');
      } finally {
        sql.close();
      }
});


router.put('/:reserva', async (req, res) => {

    const {reserva} = req.params;
    
    const {  estado } = req.body;
    
    try {
  
      await sql.connect(config);
      
      // Query para actualizar el aula
      const result = await sql.query`
        UPDATE Reserva 
        SET habilitado = ${estado}  
        WHERE codReserva = ${reserva}
      `;
  
      // Verificar que se actualizó una fila
      if(result.rowsAffected[0] === 0) {
        return res.status(404).send('reserva no encontrada');
      }
    
  
      res.json({reserva,estado});
  
    } catch (err) {
      console.error(err);
      res.status(500).send('Error al actualizar reserva');
    } finally {
      sql.close();
    }
  
  });
  






router.post('/', async (req, res) => {
    try {
        const { nombreDocente, motivo, fechaReserva, grupo, horario, materia, codAula } = req.body;
  
        if (!nombreDocente || !motivo || !fechaReserva || !grupo || !horario || !materia || !codAula) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
        }
  
      // Realiza la transformación condicional según el valor de 'horario'
  
       await sql.connect(config);
        const query = `INSERT INTO Reservas (nombreDocente, motivo, fechaReserva, grupo, horario, materia, codAula) VALUES ('${nombreDocente}', '${motivo}', '${fechaReserva}',${grupo},'${horario}','${materia}','${codAula}')`;
        const result = await sql.query(query);
  
        if (result.rowsAffected[0] === 1) {
            res.status(201).json({ message: 'Reserva Agregada' });
        } else {
            res.status(500).json({ error: 'No se pudieron agregar los datos de la reserva' });
        }
    } catch (err) {
        console.error('Error al agregar datos de la reserva a la base de datos:', err);
        res.status(500).json({ error: 'Error interno del servidor' });
    } finally {
        sql.close();
    }
    
  });


  module.exports = router;
  
