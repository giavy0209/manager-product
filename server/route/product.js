const app = require('./express')
const Product = require('../schema/Product')
const AImport = require('../schema/AImport')
const User = require('../schema/User')
const {ITEM_PER_PAGE} = require('../variable')

module.exports =  app.post('/product/:page', async (req,res) =>{
    var query = req.body

    var user = await User.findOne(query)

    if(user.isAdmin){
        var page = req.params.page
        var totalItem = await Product.countDocuments()
        var skip = ITEM_PER_PAGE * (page - 1)
        var product = await Product.find({}).populate('in').sort({_id: -1}).skip(skip)
        res.send({product,totalItem, ITEM_PER_PAGE})
    }
})
