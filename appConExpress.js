const express = require('express')

//!app es una instancia de express
const app = express()

app.get('/',(request,response)=>{
    console.log('Servidor creado con express');
})


//escuchador de peticiones
app.listen(3000,()=>{
    console.log('Aplicacion con express escuchando puerto 3000');
})