const mongoose = require('mongoose');
const variable = require('../variable')
mongoose.connect(`mongodb://admin:Phamgiavyvn123@207.148.67.200:27017/${variable.DB_NAME}?authSource=admin`,{ useNewUrlParser: true ,useUnifiedTopology: true});

module.exports = mongoose