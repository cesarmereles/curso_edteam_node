const http = require('http')
//const { json } = require('stream/consumers')
const url = require('url')

const server = http.createServer((request, response)=>{
    try {
        
        const parseURL = url.parse(request.url,true)
        const {name} = parseURL.query
        
        
        
        //comprobando la ruta que estoy accediendo y el tipo de metodo que estoy utilizando
        //request.url=='/' compruebo si esta url es igual a la url de inicio y compruebo si utilizo el metodo get
        if(request.url=='/' && request.method=='GET'){
            response.statusCode = 200
            response.end(JSON.stringify({"message":"Accediendo al servidor"}))
        }else if(request.url=='/home' && request.method=='GET'){
            response.statusCode = 300
            response.end(JSON.stringify({"message":"Accediendo al home"}))
        }else if(parseURL.pathname === "/profile" && name){
            response.statusCode = 200
            response.end(JSON.stringify({"message":"Accediendo a ruta con parametro:"+name}))
        } else if(request.url=='/register' && request.method=='POST'){
            //!aca guardo los datos que vienen del body
            let body = ''
            //debo detectar el evento que trasmite esos datos
            request.on('data', (data)=>{
                body+=data
            })
            request.on('end',()=>{
                const parseDATA = JSON.parse(body)
                const {username, email} = parseDATA
                console.log(username,email);
                response.statusCode = 201
                response.end(JSON.stringify({"message":"Datos registrados"}))
            })

        }else{
            response.statusCode = 404
            response.end(JSON.stringify({"message":"No encontrado"}))
        }    
    } catch (error) {
        response.statusCode = 500
        response.end(JSON.stringify({"message":"ha ocurrido un error en el Server"}))
    }
    
    
})

const port = 5000
const host = 'localhost'

server.listen(port,host,() => {
    console.log(`Servidor ejecutandose en el http://${host}:${port}`)} 
)