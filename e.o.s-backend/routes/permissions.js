var express = require('express');
var router = express.Router();
const isEmpty = require('is-empty');

let db = require('../config/db');

let permissions, id, query;

// create user permissions
router.post('/create-user-permissions', function (req, res, err) {
    if(req) {
        permissions = {
            user_id: req.body.user_id,
            canAddProduct: req.body.canAddProduct,
            canEditProduct: req.body.canEditProduct,
            canAddCategory: req.body.canAddCategory,
            canEditCategory: req.body.canEditCategory
        };

        // check for empty values
        if (isEmpty(permissions.user_id)) {
            console.log('Bad Request, No User ID specified');
            res.status(400);
            res.json({
                status: 400,
                message: 'Bad Request, No User ID specified',
                stream: permissions
            });
        } else {
            query = `Insert into user_perm set?`;
            db.query(query, permissions ,function (err, rows) {
                if (!err) {
                    res.status(201);
                    res.json({
                        status: 201,
                        message: `User Permissions Set!`,
                        stream: permissions
                    });
                } else {
                    console.log('An Error Occurred: -> %s', err.message);
                    res.status(400);
                    res.json({
                        status: 400,
                        message: 'An Error Occurred: -> ' + err.message
                    });
                }
            })
        }
    } else {
        console.log('Internal Server Error!!\n:%s ', err);
        res.status(500);
        res.json({
            status: 500,
            message: `Internal Server Error: ${err}`
        })
    }
});

// get user permissions
router.get('/', function (req, res) {
    query = `Select * from user_perm`;
    db.query(query, function (err, rows) {
        if (!err) {
            if (isEmpty(rows)) {
                console.log('No User Permissions Set!!');
                res.status(404);
                res.json({
                    status: 404,
                    message: 'No User Permissions Set'
                });
            } else {
                console.log('Got user permissions:');
                console.log(rows);
                res.status(200);
                res.json({
                    status: 200,
                    message: rows
                });
            }
        } else {
            console.log('An Error Occurred: -> %s', err.message);
            res.status(400);
            res.json({
                status: 400,
                message: err.message
            });
        }
    });
});

// get one user permissions
router.get('/:id', function (req, res) {
    id = req.params.id;
    query = `Select * from user_perm where user_id = ${id}`;
    db.query(query, function (err, rows) {
        if (!err) {
            if (isEmpty(rows)) {
                console.log('User permissions for user: ' + id + ' not created!');
                res.status(404);
                res.json({
                    status: 404,
                    message: 'User permissions for user: ' + id + ' not created!'
                });
            } else {
                console.log('Retriving user ' + id + ' permissions')
                console.log(rows);
                res.status(200);
                res.json({
                    status: 200,
                    message: rows
                });
            }
        } else {
            console.log('An Error Occurred: -> %s', err.message);
            res.status(400);
            res.json({
                status: 400,
                message: err.message
            });
        }
    })
});

module.exports = router;