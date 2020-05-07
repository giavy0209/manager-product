const app = require('./express')
const User = require('../schema/User')

module.exports =  app.post('/import', async (req,res) =>{
    const query = req.body
    var imports = await User.findOne(query).populate('Import').select('import')
    res.send(imports)
    
})