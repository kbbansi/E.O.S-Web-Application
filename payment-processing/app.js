const express = require('express');
const request = require('request');
const bodyParser = require('body-parser');
const cors = require('cors');
const pug = require('pug');
const _ = require('lodash');
const path = require('path');
const { Donor } = require('./models/Donor');
const { JenPay } = require('./models/JenPay');

// sconst { response } = require('express');
const { initializePayment, verifyPayment } = require('./config/paystack')(request);

const port = process.env.PORT || 3400;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', pug);

app.get('/', (req, res) => {
    res.render('index.pug');
});


app.use(cors());
app.post('/paystack/pay', (req, res) => {
    const form = _.pick(req.body, ['amount', 'email', 'firstName']);

    console.log(req.body)

    form.metadata = {
        firstName: form.firstName,
        email: form.email
    }

    form.amount *= 100;

    initializePayment(form, (error, body) => {
        if (error) {
            console.log(`Error:${error.code} occurred. Details: ${error}`);
            return;
        }
        response = JSON.parse(body);
        res.json({
            message: response.data.authorization_url
        });
    });
});

app.get('/paystack/callback', (req, res) => {
    const ref = req.query.reference;

    verifyPayment(ref, (error, body) => {
        if (error) {
            console.log(`Error:${error.code} occurred. Details: ${error}`);

            return res.redirect('/error');
        }
        response = JSON.parse(body);

        const data = _.at(response.data, ['reference', 'amount', 'customer.email', 'metadata.firstName']);

        [reference, amount, email, firstName] = data;

        pay_jen = { reference, amount, email, firstName}

        const jenPay = new JenPay(pay_jen)
        jenPay.save().then((jenPay) => {
            if (jenPay) {
                res.redirect('/receipt/' + jenPay._id);
            }
        }).catch((e) => {
            console.log(e);
            res.redirect('/error');
        })
    })
});

app.get('/receipt/:id', (req, res) => {
    const id = req.params.id;
    JenPay.findById(id).then((jenPay) => {
        if (!jenPay) {
            //handle error when the jenPay is not found
            res.redirect('/error')
        }
        res.render('success.pug', { jenPay });
    }).catch((e) => {
        console.log(e);
        res.redirect('/error')
    });
});
app.get('/error', (req, res) => {
    res.render('error.pug');
});

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});
