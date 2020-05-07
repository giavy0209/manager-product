const app = require('./express')
const User = require('../schema/User')
const fs = require('fs')
const path = require('path')
module.exports = app.post('/delete-img',async (req,res)=>{
    const query = req.body.user

    var user = await User.findOne(query)
    if(user && user.isAdmin){
        fs.unlinkSync(path.join(__dirname, `../uploads/${req.body.img}`))
        var listImg = fs.readdirSync(path.join(__dirname,'../uploads')).reverse()
        res.send({listImg})
    }
    
})