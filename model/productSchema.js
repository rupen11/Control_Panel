const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    customerid: {
        type: String,
        require: true
    },
    customername: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    contact: {
        type: String,
        require: true
    },
    productname: {
        type: String,
        require: true
    },
    productprice: {
        type: String,
        require: true
    },
    productquantity: {
        type: String,
        require: true
    },
    totalamount: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

const Product = mongoose.model("product", productSchema);

module.exports = Product;