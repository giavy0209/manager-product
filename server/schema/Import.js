const mongoose = require('./common')

const importSchema = new mongoose.Schema({
    product : { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity : Number , 
    price : Number
});


module.exports = mongoose.model('Import', importSchema);
