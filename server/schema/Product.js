const mongoose = require('./common')

const productSchema = new mongoose.Schema({
    name : String,
    thumb : String,
    createDate: Date,
    exPrice: Number,
    percentToCoop: Number,
    category:[{type : mongoose.Schema.Types.ObjectId, ref: 'Import'}],
    in : [{type : mongoose.Schema.Types.ObjectId, ref: 'Import'}],
    out : [{type : mongoose.Schema.Types.ObjectId, ref: 'Export'}],
});

module.exports = mongoose.model('Product', productSchema);
