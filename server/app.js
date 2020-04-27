const http = require('http')
const variable = require('./variable')

const app = require('./express')

const server = http.Server(app);

server.listen(variable.PORT);


require('./route/index')
