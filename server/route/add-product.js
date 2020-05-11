const app = require('./express')
const Product = require('../schema/Product')
const User = require('../schema/User')

module.exports =  app.post('/add-product', async (req,res) =>{
    var query = req.body.user
    var product = req.body.submitData
    console.log(product);
    

    var user = await User.findOne(query)

    if(user.isAdmin){
        var product = new Product({
            ...product,
            category: [product.category],
            in: [],
            out: []
        })
        product.save()
        res.send({})
    }
})
