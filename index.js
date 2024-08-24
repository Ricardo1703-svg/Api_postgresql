import express from 'express'
import { config} from 'dotenv'
import pg from 'pg'

config()

const app = express()

const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    //ssl: true
})

app.use(express.json())

app.post('/items', async (req, res) => {
    const { materia, nombre, desarrollo, actividad } = req.body;

    // Validar que todos los campos estén presentes
    if (!materia || !nombre || !desarrollo || !actividad) {
        return res.status(400).json({ error: 'Todos los campos son requeridos: materia, nombre, desarrollo, actividad' });
    }

    try {
        const result = await pool.query(
            'INSERT INTO items (materia, nombre, desarrollo, actividad) VALUES ($1, $2, $3, $4) RETURNING *',
            [materia, nombre, desarrollo, actividad]
        );
        return res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

app.get('/', (req, res) => {
    res.send('Hola perras!')
})

app.get('/ping', async (req, res) => {
    const result =await pool.query('SELECT NOW()')
    return res.json(result.rows[0])
})

app.listen(4000)
console.log('Servidor en el puerto 4000')
