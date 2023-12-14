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




router.post('/', async (req, res) => {
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


  module.exports = router;
  