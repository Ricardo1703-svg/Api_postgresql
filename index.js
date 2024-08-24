import express from 'express'

const app = express()

app.get('/', (req, res) => {
    res.send('Hola perras!')
})

app.listen(4000)
console.log('Servidor en el puerto 4000')