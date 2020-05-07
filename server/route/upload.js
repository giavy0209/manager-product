const app = require('./express')
const uploadFile = require('../multer')
const User = require('../schema/User')
module.exports = app.post('/upload',async (req,res)=>{
    const query = {phone: req.headers.phone, password: req.headers.password}

    var user = await User.findOne(query)
    if(user && user.isAdmin){
        uploadFile(req, res , (err) =>{
            res.send({upload:true})
        })
    }
})