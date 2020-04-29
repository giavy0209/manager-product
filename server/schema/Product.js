const mongoose = require('./common')

const productSchema = new mongoose.Schema({
    name : String,
    thumb : String,
    note: String,
    in : [{type : mongoose.Schema.Types.ObjectId, ref: 'Import'}],
    out : [{type : mongoose.Schema.Types.ObjectId, ref: 'Export'}],
});

module.exports = mongoose.model('Product', productSchema);
