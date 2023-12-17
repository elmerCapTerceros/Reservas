const {Router} = require('express');
const router = new Router();
const sql = require('mssql');
const express = require('express');
const config = {
    server: 'localhost',
    user: 'capTerceros',
    port: 1433,
    password: 'estopa',
    database: 'ReservaProyecto',
    options: {
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    },
};




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
  