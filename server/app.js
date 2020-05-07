const http = require('http')
const variable = require('./variable')
const express= require('express');
const app = require('./route/express')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static('uploads'));
const server = http.Server(app);

server.listen(variable.PORT);


const User = require('./schema/User')
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("*", "*");
    next();
});
require('./route/user-info')
require('./route/login')
require('./route/upload')
require('./route/import')
require('./route/product')
require('./route/list-image')
require('./route/product-delete')
require('./route/delete-img')