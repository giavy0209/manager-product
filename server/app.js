const http = require('http')
const variable = require('./variable')

const app = require('./route/express')

const server = http.Server(app);

server.listen(variable.PORT);


const Product = require('./schema/Product')
const Import = require('./schema/Import')


app.use((req,res,next)=>{
    console.log(123);
    next()
})
require('./route/index')

app.get('/test',(req,res)=>{
    res.send('test')
})