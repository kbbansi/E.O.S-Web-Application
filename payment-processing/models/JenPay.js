const {mongoose} = require('./../config/mongoose');

const jenPaySchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    amount: {type: Number, required: true},
    productID: {type: Number, required: true},
    reference: {type: String, required: true}
});

const JenPay = mongoose.model('JenPay', jenPaySchema);
module.exports = {JenPay}