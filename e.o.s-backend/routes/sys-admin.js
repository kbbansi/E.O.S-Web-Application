var express = require('express');
var router = express.Router();
const isEmpty = require('is-empty');
let db = require('../config/db');
const mailService = require('../util/util');

let admin, query, id, mailDataObject, salesPersonnel;

// add new Admin
router.post('/add-admin', function (req, res, err) {
    if (req) {
        admin = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            otherNames: req.body.otherNames,
            email: req.body.email,
            userName: req.body.userName,
            contactNo: req.body.contactNo,
            userType: req.body.userType
        };
        if (isEmpty(admin.firstName) || isEmpty(admin.lastName)
            || isEmpty(admin.email) || isEmpty(admin.contactNo)) {
            console.log('Missing Fields %s', admin);
            res.status(400);
            res.json({
                status: 400,
                message: 'FAIL, BAD REQUEST, Missing admin fields',
                stream: admin
            });
        } else {
            let adminCheck = `Select count(*) as admin from users where email = '${admin.email}'`;
            db.query(adminCheck, function (err, rows) {
                if (!err) {
                    if (isEmpty(rows[0].admin)) {
                        query = `Insert into users set?`;
                        db.query(query, admin, function (err, rows) {
                            if (!err) {
                                res.status(201);
                                res.json({
                                    status: 201,
                                    message: 'Admin Created',
                                    stream: admin
                                });
                                mailDataObject = {
                                    to: admin.email,
                                    firstName: admin.firstName,
                                    from: 'ladynaad@gmail.com',
                                    subject: 'Welcome to EOS Admin System'
                                };
                                mailService.mailServer('register', mailDataObject);
                            } else {
                                console.log(`An Error Occurred: ${err.message}`);
                                res.status(400);
                                res.json({
                                    status: 400,
                                    message: `An Error Occurred: ${err}`
                                });
                            }
                        })
                    } else {
                        console.log(`Admin email already exists ${rows[0].admin}`);
                        res.status(400);
                        res.json({
                            status: 400,
                            message: 'Admin email already exists'
                        })
                    }
                } else {
                    console.log(`An Error Occurred: ${err.message}`);
                    res.status(400);
                    res.json({
                        status: 400,
                        message: `An Error Occurred: ${err}`,
                        code: err.code
                    })
                }
            })
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

router.post('/add-sales-personnel', function (req, res, err) {
    if (req) {
        salesPersonnel = {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            otherNames: req.body.otherNames,
            email: req.body.email,
            userName: req.body.userName,
            contactNo: req.body.contactNo,
            userType: req.body.userType
        };
        if (isEmpty(salesPersonnel.firstName) || isEmpty(salesPersonnel.lastName)
            || isEmpty(salesPersonnel.email) || isEmpty(salesPersonnel.contactNo)) {
            console.log('Missing Fields %s', salesPersonnel);
            res.status(400);
            res.json({
                status: 400,
                message: 'FAIL, BAD REQUEST, Missing salesPersonnel fields',
                stream: salesPersonnel
            });
        } else {
            let salesPersonnelCheck = `Select count(*) as sales_personnel from users where email = '${salesPersonnel.email}'`;
            db.query(salesPersonnelCheck, function (err, rows) {
                if (!err) {
                    if (isEmpty(rows[0].salesPersonnel)) {
                        query = `Insert into users set?`;
                        db.query(query, salesPersonnel, function (err, rows) {
                            if (!err) {
                                res.status(201);
                                res.json({
                                    status: 201,
                                    message: 'salesPersonnel Created',
                                    stream: salesPersonnel
                                });
                                mailDataObject = {
                                    to: salesPersonnel.email,
                                    firstName: salesPersonnel.firstName,
                                    from: 'ladynaad@gmail.com',
                                    subject: 'Welcome to EOS Admin System'
                                };
                                mailService.mailServer('register', mailDataObject);
                            } else {
                                console.log(`An Error Occurred: ${err.message}`);
                                res.status(400);
                                res.json({
                                    status: 400,
                                    message: `An Error Occurred: ${err}`
                                });
                            }
                        })
                    } else {
                        console.log(`salesPersonnel email already exists ${rows[0].salesPersonnel}`);
                        res.status(400);
                        res.json({
                            status: 400,
                            message: 'salesPersonnel email already exists'
                        })
                    }
                } else {
                    console.log(`An Error Occurred: ${err.message}`);
                    res.status(400);
                    res.json({
                        status: 400,
                        message: `An Error Occurred: ${err}`,
                        code: err.code
                    })
                }
            })
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



// get all store managers (admin users)
/**
 * Decision
 * userType values:
 * UserType 1 - Store Manager
 * UserType 2 - Sales Person
 * UserType 3 - Customer
 * UserType 4 - System Admin(*unique)
 */

router.get('/store-manager', function (req, res) {
    query = `Select * from users where userType = 1`;
    db.query(query, function (err, rows) {
        if (!err) {
            if (isEmpty(rows)) {
                console.log(`No Store Managers Created`);
                res.status(404);
                res.json({
                    status: 404,
                    message: 'No Store Managers Created'
                });
            } else {
                console.log(rows);
                res.status(200);
                res.json({
                    status: 200,
                    message: rows
                });
            }
        } else {
            console.log(`An Error Occurred: -> ${err.message}`);
            res.status(400);
            res.json({
                status: 400,
                message: `${err.message}`
            });
        }
    });
});

// get all sales personnel
router.get('/sales-personnel', function (req, res) {
    query = `Select * from users where userType = 2`;
    db.query(query, function (err, rows) {
        if (!err) {
            if (isEmpty(rows)) {
                console.log(`No Sales Personnel Created`);
                res.status(404);
                res.json({
                    status: 404,
                    message: 'No Sales Personnel Created'
                });
            } else {
                console.log(rows);
                res.status(200);
                res.json({
                    status: 200,
                    message: rows
                });
            }
        } else {
            console.log(`An Error Occurred: -> ${err.message}`);
            res.status(400);
            res.json({
                status: 400,
                message: `${err.message}`
            });
        }
    });
});


module.exports = router;