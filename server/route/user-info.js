const app = require('./express')
const User = require('../schema/User')
module.exports =  app.post('/user-info', async (req,res) =>{
    const query = req.body
    var user = await User.findOne(query)
    if(user){
        res.send(user)
    }else{
        res.send({ok:false})
    }
})
