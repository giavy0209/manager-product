const app = require('../express')

module.exports = app.get('/',(req,res)=>{
    res.send('home')
})