const express = require('express');
const router = express.Router();
const isEmpty = require('is-empty');
const db = require('../config/db');

let category, query, id;

// add new category
router.post('/create', function (req, res, err) {
    if (req) {
        category = {
            categoryName: req.body.categoryName,
            description: req.body.description
        };

        // check for empty values
        if (isEmpty(category.categoryName)) {
            console.log('Missing fields %s', category);
            res.status(400);
            res.json({
                status: 400,
                message: 'FAIL, BAD REQUEST, Missing category fields',
                stream: category
            });
        } else {
            // insert dat into database
            query = `Insert into categories set?`;
            db.query(query, category, function (err, rows) {
                if (!err) {
                    res.status(201);
                    res.json({
                        status: 201,
                        message: 'Category Created',
                        stream: category
                    });
                } else {
                    console.log(`An Error Occurred: ${err.message}`);
                    res.status(400);
                    res.json({
                        status: 400,
                        message: `An Error Occurred: ${err}`
                    });
                }
            });
        }
    } else {
        console.log(`INTERNAL SERVER ERROR: ${err}`);
        res.status(500);
        res.json({
            status: 500,
            message: `INTERNAL SERVER ERROR: ${err}`
        });
    }
});


// get all categories
router.get('/', function (req, res) {
    query = `Select * from categories order by id desc`;
    db.query(query, function (err, rows) {
        if (!err) {
            if (isEmpty(rows)) {
                res.status(404);
                res.json({
                    status: 404,
                    message: 'NOT FOUND, No Categories Found'
                });
            } else {
                res.status(200);
                res.json({
                    status: 200,
                    message: rows
                });
            }
        } else {
            console.log('An Error Occurred %s', err.message);
            res.status(400);
            res.json({
                status: 400,
                message: `FAIL, BAD REQUEST, ${err.message}`
            });
        }
    });
});

// update category

// get all products for a category
router.get('/product/:id', function (req, res) {
    id = req.params.id;
    query = `select products.id, products.productName, products.price, products.productImage, categories.categoryName as category, products.description, products.stock, products.createdOn
    from products
    join categories  on products.categoryID = categories.id
    where categoryID = ${id}
     order by id desc`;
    db.query(query, function (err, rows) {
        if (!err) {
            if (isEmpty(rows)) {
                res.status(404);
                res.json({
                    status: 404,
                    message: 'NOT FOUND, No Products Found'
                });
            } else {
                res.status(200);
                res.json({
                    status: 200,
                    message: rows
                });
            }
        } else {
            console.log('An Error Occurred %s', err.message);
            res.status(400);
            res.json({
                status: 400,
                message: `FAIL, BAD REQUEST, ${err.message}`
            });
        }
    });
})
module.exports = router;