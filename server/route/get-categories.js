const app = require('./express')
const User = require('../schema/User')
const Categories = require('../schema/Categories')

module.exports =  app.post('/get-categories', async (req,res) =>{
    const query = req.body
    var user = await User.findOne(query)
    if(user.isAdmin){
        categories = await Categories.find({})
        res.send(categories)
    }
    
})