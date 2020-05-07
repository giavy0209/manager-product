const app = require('./express')
const Product = require('../schema/Product')
const User = require('../schema/User')

module.exports = app.post('/product-delete/:id',async (req,res)=>{
    const id = req.params.id
    const query = req.body

    var user = await User.findOne(query)
    if(user && user.isAdmin){
        await Product.findByIdAndDelete(id)
        var listProduct = await Product.find({})
        res.send({deleteSuccess: true,listProduct})
        
    }
    
})