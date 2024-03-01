const express = require('express')

const app = express()

app.get('/users', () => {
    // ...
})

app.get('/users/:uid', () => {

})

app.get('/test', (_, res) => {
    res.end('Hola, tester!!')
})

app.listen(3000, () => {
    console.log('Servidor listo!')
})

