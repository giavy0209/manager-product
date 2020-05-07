const app = require('./express')
const User = require('../schema/User')
module.exports =  app.post('/login', async (req,res) =>{
    const query = {phone , pass} = req.body
    
    var user = await User.findOne(query)
    if(user){
        res.send({ok:true, isAdmin: user.isAdmin})
    }else{
        res.send({ok:false, isAdmin: user.isAdmin})
    }
})


// const jwt = require('jsonwebtoken')
// const User = require('../schema/User')

// const TOKEN_LIST = require('./TOKEN_LIST.JS')

// const variable = require('../variable')
// module.exports = app.post('/login',async (req,res)=>{
//     const postData = req.body;
//     const user = {
//       username: postData.user,
//       password: postData.pass
//     }

//     var userValue = await User.findOne(user)
//     if(userValue){
//         const token = jwt.sign(user, variable.TOKEN_SECRET, {
//             expiresIn: variable.TOKEN_LIFE,
//         });
        
//         const refreshToken = jwt.sign(user, variable.REFRESH_TOKEN_SECRET, {
//             expiresIn: variable.REFRESH_TOKEN_LIFE
//         });

//         TOKEN_LIST[refreshToken] = user;
//         const response = {
//             token,
//             refreshToken,
//         }
//         res.json(response);
//     }
// })