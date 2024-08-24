const e = require('express');
const { Pool } = require('pg')

const app = express()
const pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    //ssl: true
})

const CrearUsuario = async (req, res) => {
    const {nombre, email} = req.body;
    
    const response = await pool.query('INSERT INTO users (nombre, email) VALUES ($1, $2)', [nombre, email])
    console.log(response);
    res.json({
        message: 'User created successfully',
        body:{
            user: {nombre,email}
        }
    })
}

module.exports = {
    CrearUsuario
}