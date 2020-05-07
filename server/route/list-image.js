const app = require('./express')
const fs = require('fs')
const path = require('path')
const User = require('../schema/User')
module.exports = app.post('/list-image',async (req,res)=>{
    const query = req.body
    var user = await User.findOne(query)
    if(user && user.isAdmin){
        var listImage = fs.readdirSync(path.join(__dirname, '../uploads'))
        
        listImage = listImage.reverse()

        res.send({listImage})
        
    }
})