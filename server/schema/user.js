const mongoose = require('./common')

const userSchema = new mongoose.Schema({
    username:String,
    password:String,
});

const userInfos = mongoose.model('userInfos', userSchema);
