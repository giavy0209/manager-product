const app = require('./express')
const User = require('../schema/User')
const Categories = require('../schema/Categories')

module.exports =  app.post('/add-category', async (req,res) =>{
    const {phone, password, name} = req.body
    
    const query = {phone,password}
    var user = await User.findOne(query)
    
    if(user && user.isAdmin){
        category = new Categories({
            name
        })
        category.save()
        res.send({ok:true})
    }
    
})