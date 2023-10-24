const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// Conecta a MongoDB
mongoose.connect('mongodb://localhost/ReservaAulas', { useNewUrlParser: true });

// Configura sesiones y passport para autenticación
app.use(session({ secret: 'mi-secreto', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());


const reserva = mongoose.model('reserva', {
    nombreCompleto: String,
    fecha: Date,
    grupo: Number,
    horario: String,
    motivo: String,
    materia: String,
});

const aula = mongoose.model('aula', {
    nameAula: String,
    capacidad: Number,
    descripcion: String,
});

// Configura la estrategia de autenticación local con Passport
passport.use(new LocalStrategy((username, password, done) => {
    // Aquí debes verificar si el usuario y la contraseña son correctos en tu base de datos
    // Si los datos son correctos, puedes llamar a done(null, user)
    // Si no, puedes llamar a done(null, false) o done(err) si hay un error
}));

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

// Middlewares para procesar datos JSON y formularios
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Rutas
app.get('/reservas', async (req, res) => {
    try {
        const reservas = await Reserva.find();
        res.json(reservas);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar reservas' });
    }
});

app.post('/reservas', async (req, res) => {
    const reservaData = req.body;
    const reserva = new reserva(reservaData);

    try {
        const nuevaReserva = await reserva.save();
        res.json(nuevaReserva);
    } catch (error) {
        res.status(400).json({ error: 'Error al crear la reserva' });
    }
});

app.put('/reservas/:id', async (req, res) => {
    const reservaData = req.body;
    const id = req.params.id;

    try {
        const reservaActualizada = await Reserva.findByIdAndUpdate(id, reservaData, { new: true });
        res.json(reservaActualizada);
    } catch (error) {
        res.status(400).json({ error: 'Error al actualizar la reserva' });
    }
});

app.delete('/reservas/:id', async (req, res) => {
    const id = req.params.id;

    try {
        await Reserva.findByIdAndDelete(id);
        res.json({ message: 'Reserva eliminada con éxito' });
    } catch (error) {
        res.status(400).json({ error: 'Error al eliminar la reserva' });
    }
});


app.get('/ver-reservas', async (req, res) => {
    try {
        const reservas = await reserva.find(); // Recupera todos los documentos de la colección "reservas"
        res.render('ver-reservas', { reservas }); // Renderiza una vista o devuelve los datos como JSON
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener reservas' });
    }
});

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/login',
        failureFlash: true
    })
);

app.get('/dashboard', (req, res) => {
    // Ruta protegida, solo accesible para usuarios autenticados
});

app.get('/aulas', async (req, res) => {
    try {
        const aulas = await aula.find();
        res.json(aulas);
    } catch (error) {
        res.status(500).json({ error: 'Error al buscar aulas' });
    }
});

// Inicia el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor en ejecución en el puerto ${PORT}`);
});