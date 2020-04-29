const app = require('./express')



module.exports = app.get('/',(req,res)=>{
    // console.log(123);
    
    res.send('home')
})