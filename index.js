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

app.get('/', (req, res) => {
    res.send('Hola perras!')
})

app.get('/ping', async (req, res) => {
    const response = await pool.query('SELECT * FROM items');
    res.status(200).json(response.rows);
})

app.listen(4000)
console.log('Servidor en el puerto 4000')