const app = require('./express')
const User = require('../schema/User')
const Categories = require('../schema/Categories')

module.exports =  app.post('/delete-categories', async (req,res) =>{
    const query = req.body.user
    const id = req.body.id
    var user = await User.findOne(query)
    if(user.isAdmin){
        await Categories.findByIdAndDelete(id)
        res.send({ok:true})
    }
    
})