const mongoose = require('./common')

const userSchema = new mongoose.Schema({
    phone:String,
    password:String,
    name: String,
    address: String,
    ID:String,
    isAdmin: Boolean,
    import: [{type : mongoose.Schema.Types.ObjectId, ref: 'Import'}],
    export: [{type : mongoose.Schema.Types.ObjectId, ref: 'Export'}],
    inventory: [{type : mongoose.Schema.Types.ObjectId, ref: 'Inventory'}],
    refFor:  [{type : mongoose.Schema.Types.ObjectId, ref: 'User'}],
    consum: 0,
    return: 0,
    createDate: Date,
});

module.exports = mongoose.model('User', userSchema);

