const sql = require('mssql');

const config = {
    server: 'localhost',
    user: 'capTerceros',
    password: 'estopa',
    database: 'ReservaProyecto',
    options: {
        "encrypt": true,
        enableArithAbort: true, // o false, según tus necesidades
      },
  };

  async function insertAula() {
    try {
        await sql.connect(config);

        const request = new sql.Request();
        request.input('codAula', sql.NVarChar, '690A');
        request.input('Capacidad', sql.Int, 100);
        request.input('Descripcion', sql.NVarChar, 'Aula grande con proyector');

        const query = 'INSERT INTO Aula (codAula, Capacidad, Descripcion) VALUES (@codAula, @Capacidad, @Descripcion)';
        const result = await request.query(query);

        console.log('Registro insertado correctamente.');

    } catch (err) {
        console.error('Error al insertar registro:', err);
    } finally {
        sql.close();
    }
}

insertAula();