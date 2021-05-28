var express = require('express');
var router = express.Router();
const isEmpty = require('is-empty');
const passwordHash = require('../config/password');
let db = require('../config/db');
const mailService = require('../util/util');

let user, query, id, mailDataObject, verifyUser, userAddress;

// create new user
router.post('/create', function (req, res, err) {
  if (req) {
    user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      otherNames: req.body.otherNames,
      email: req.body.email,
      userName: req.body.userName,
      password: passwordHash.passwordHash(req.body.password),
      contactNo: req.body.contactNo,
      userType: req.body.userType
    };

    // check for empty values
    if (isEmpty(user.firstName) || isEmpty(user.lastName) || isEmpty(user.email)
      || isEmpty(user.password) || isEmpty(user.contactNo)) {
      // console.log(`Missing Fields: ${user}`);
      console.log('Missing Fields %s', user)
      res.status(400);
      res.json({
        status: 400,
        message: 'FAIL, BAD REQUEST, Missing user fields',
        stream: user
      });
    } else {
      verifyUser = `Select count(*) as user from users where email = '${user.email}'`;
      db.query(verifyUser, function (err, rows) {
        if (!err) {
          console.log(user.email);
          console.log(rows)
          if (isEmpty(rows[0].user)) {
            // create new user
            query = `Insert into users set?`;
            db.query(query, user, function (err, rows) {
              if (!err) {
                res.status(201);
                res.json({
                  status: 201,
                  message: `User Created`,
                  stream: user
                });
                // send welcome email here
                mailDataObject = {
                  to: user.email,
                  firstName: user.firstName,
                  from: 'jennifer.tagoe@regent.edu.gh',
                  subject: 'Welcome to EOS Enterprise'
                };

                mailService.mailServer('register', mailDataObject);
              } else {
                console.log(`An Error Occurred: ${err.message}`);
                res.status(400);
                res.json({
                  status: 400,
                  message: `An Error Occurred: ${err}`
                })
              }
            })
          } else {
            console.log(`User email already exists ${rows[0].user}`);
            res.status(400);
            res.json({
              status: 400,
              message: 'User email already exists'
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
})


// get all users
router.get('/', function (req, res, next) {
  query = `Select * from users`;
  db.query(query, function (err, rows) {
    if (!err) {
      if (isEmpty(rows)) {
        console.log(`No Users on the System`);
        res.status(404);
        res.json({
          status: 404,
          message: 'No Users on the System'
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
      console.log(`An Error occurred: -> ${err.message}`);
      res.status(400);
      res.json({
        status: 400,
        message: `${err.message}`
      });
    }
  });
});


// get one user
router.get('/:id', function (req, res) {
  id = req.params.id;
  query = `Select * from users where id = ${id}`
  db.query(query, function (err, rows) {
    if (!err) {
      if (isEmpty(rows)) {
        console.log('No such user found');
        res.status(404);
        res.json({
          status: 404,
          message: 'No such user found'
        });
      } else {
        console.log(`Found: ${rows}`)
        res.status(200);
        res.json({
          status: 200,
          message: rows
        });
      }
    } else {
      console.log(err);
      res.status(400);
      res.json({
        status: 400,
        message: `${err}`
      });
    }
  });
});

// update one user
router.put('/user/:id', function (req, res) {
  id = req.params.id;
  query = `Update users set? where id = ${id}`;
  if (req) {
    user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      otherNames: req.body.otherNames,
      email: req.body.email,
      userName: req.body.userName,
      contactNo: req.body.contactNo
    };
    if (isEmpty(user.firstName) || isEmpty(user.lastName) || isEmpty(user.email) 
    || isEmpty(user.contactNo) || isEmpty(user.userName)) {
      // console.log(`Missing Fields: ${user}`);
      console.log('Missing Fields %s', user)
      res.status(400);
      res.json({
        status: 400,
        message: 'FAIL, BAD REQUEST, Missing user fields',
        stream: user
      });
    } else {
      console.log('Updating %s', user, ' in the db');
      db.query(query, user, function (err, rows) {
        if (!err) {
          res.status(200);
          res.json({
            status: 200,
            message: 'User Updated',
            stream: user
          });
        } else {
          console.log(`An Error Occurred: ${err.message}`);
          res.status(400);
          res.json({
            status: 400,
            message: `An Error Occurred: ${err.message}`
          });
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

// delete user
router.delete('/user/delete', function (req, res) {
  res.status(200);
  res.json({
    status: 200,
  });
});

// create delivery details
router.post('/address/delivery-address/:id', function (req, res, err) {
  id = req.params.id;
  if (req) {
    userAddress = {
      userID: id,
      streetName: req.body.streetName,
      streetNo: req.body.streetNo,
      district: req.body.district,
      region: req.body.region,
      ghanaPostCode: req.body.ghanaPostCode
    }

    if (isEmpty(userAddress.streetName) || isEmpty(userAddress.streetNo) || isEmpty(userAddress.district)
    || isEmpty(userAddress.region) || isEmpty(userAddress.ghanaPostCode)) {
      console.log('Missing Fields %s', userAddress);
      res.status(400);
      res.json({
        status: 400,
        message: 'Fail, Bad Request, Missing fields',
        stream: userAddress
      });
    } else {
      // check user exists
      verifyUser = `Select count(*) as user from users where id = ${id}`;
      db.query(verifyUser, function (err, rows) {
        if (!err) {
          console.log(id);
          console.log(rows);

          if (isEmpty(rows[0].user)) { // if user does not exist, then request should fail
            console.log('User %s', id, ' does not exist');
            res.status(400);
            res.json({
              status: 400,
              message: `User ${id} does not exsit`
            });
          } else {
            // else save the address
            query = `Insert into delivery_address set?`;
            db.query(query, userAddress, function (err, rows) {
              if (!err) {
                res.status(201);
                res.json({
                  status: 201,
                  message: `User Address Created`,
                  stream: userAddress
                });
              } else {
                console.log(`An Error Occurred: ${err.message}`);
                console.log(err.code)
                res.status(400);
                res.json({
                  status: 400,
                  message: `An Error Occurred: ${err}`,
                  code: err.code
                });
              }
            });
          }
        } else {
          // database error
          console.log(err);
          res.status(400);
          res.json({
            status: 400,
            message: `Failed, Encountered the following ${err.message}`,
            code: err.code
          });
        }
      });
    }
  } else {
    // internal server error
    console.log(err);
    res.status(500);
    res.json({
      status: 500,
      message: `Encountered: ${err}`
    })
  }
})

router.get('/analytics/users', function (req, res) {
  query = `Select count(*) as Users from users;`
  db.query(query, function (err, rows) {
    if (!err) {
      if (isEmpty(rows)) {
        console.log('No data');
        res.status(404);
        res.json({
          status: 404,
          message: 'Cannot perform analytics on users'
        })
      } else {
        console.log('Users Analytics returned: %s', rows[0].Users);
        res.status(200);
        res.json({
          status: 200,
          message: rows
        });
      }
    } else {
      console.log(`Got an error: ${err.message}`);
      res.status(400);
      res.json({
        status: 400,
        message: `FAIL, BAD REQUEST, ${err.message}`
      });
    }
  })
});

router.get('/address/user/:id', function (req, res) {
  id = req.params.id;
  query =`Select * from delivery_address where userID = ${id}`;
  db.query(query, function (err, rows) {
    if (!err) {
      if (isEmpty(rows)) {
        console.log('No shipping details for this bummer');
        res.status(404);
        res.json({
          status: 404,
          message: 'No Shipping Details foound'
        })
      } else {
        console.log(rows);
        res.status(200);
        res.json({
          status: 200,
          message: rows
        })
      }
    } else {
      console.log(`Encountered an error: ${err}`);
      res.status(400);
      res.json({
        status: 400,
        message: `Encountered an error: ${err}`
      })
    }
  })
})
module.exports = router;
