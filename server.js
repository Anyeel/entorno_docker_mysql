import express from 'express';
import mysql from 'mysql2/promise';
import nunjucks from 'nunjucks';

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'pass1234',
    database: 'paneldb_dump'
});

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

nunjucks.configure('views', {
    autoescape: true,
    express: app
});

app.set('view engine', 'nunjucks');
app.set('views', './views');

// Ruta principal
app.get('/', (req, res) => {
    res.render('index.njk');
});

// Ruta para mostrar usuarios
app.get('/users', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT login, password FROM users');
        res.render('users.njk', { users: rows });
    } catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).send('Error al obtener usuarios');
    }
});

app.get('/chats', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT id, clientid, content, created_at FROM chats ORDER BY clientid, created_at');
        res.render('chats.njk', { chats: rows });
    } catch (error) {
        console.error('Error al obtener chats:', error);
        res.status(500).send('Error al obtener chats');
    }
});

app.get('/query', async (req, res) => {
    const { sql } = req.query; // Obtiene la consulta SQL desde los parámetros de la URL
    try {
        if (!sql) {
            return res.render('query.njk', { error: 'No se proporcionó ninguna consulta SQL.' });
        }
        const [results] = await db.query(sql);
        res.render('query.njk', { results: JSON.stringify(results, null, 2) });
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.render('query.njk', { error: error.message });
    }
});

app.post('/query', async (req, res) => {
    const { sql } = req.body;
    try {
        const [results] = await db.query(sql);
        res.render('query.njk', { results: JSON.stringify(results, null, 2) });
    } catch (error) {
        console.error('Error al ejecutar la consulta:', error);
        res.render('query.njk', { error: error.message });
    }
});

// Middleware para manejar errores
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Algo salió mal');
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});