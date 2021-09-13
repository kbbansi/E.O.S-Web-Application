var express = require('express');
var router = express.Router();
const isEmpty = require('is-empty');
const mailService = require('../util/util');
const passwordHash = require('../config/password');

let db = require('../config/db');

let request, id, query, mailDataObject;
//create new request
router.post('/create-request', function (req, res) {
  if (req) {
    request = {
      user_id: req.body.user_id,
      userName: req.body.userName,
      message: req.body.message,
      email: req.body.email
    };
    if (isEmpty(request.email)) {
      console.log('Bad Request, User Email Cannot be Empty');
      res.status(400);
      res.json({
          status: 400,
          message: 'Bad Request, User Email Cannot be Empty',
          stream: request
      });
    } else {
      query = `Insert into requests set?`;
      db.query(query, request, function (err, rows) {
        if (!err) {
          res.status(201);
          res.json({
              status: 201,
              message: `Request Sent to System Admin!`,
              stream: request
          });
        } else {
          console.log('An Error Occurred: -> %s', err.message);
          res.status(400);
          res.json({
              status: 400,
              message: 'An Error Occurred: -> ' + err.message
          });
        }
      });
    }

  } else {
    console.log('Internal Server Error!!\n:%s ', err);
    res.status(500);
    res.json({
        status: 500,
        message: `Internal Server Error: ${err}`
    });
  }
});

// close request
router.put('/update-request/:id', function (req, res) {
  id = req.params.id;
  if (req) {
    request = {
      password: passwordHash.passwordHash(req.body.password),
      userName: req.body.userName,
      status: req.body.status,
      email: req.body.email,
      textPassword: req.body.password
    };
    
    if (isEmpty(request.status)) {
      console.log('Bad Request, Status Cannot be Empty');
      res.status(400);
      res.json({
          status: 400,
          message: 'Bad Request, Status Cannot be Empty',
          stream: request
      });
    } else {
      query = `Update requests set status = ? where id = ?`;
      db.query(query, [request.status, id], function (err, rows) {
        if (!err) {
          res.status(200);
          res.json({
            status: 200,
            message: 'Request Updated!',
            stream: request
          });
          //update user password
          updateUserPassword(request.password, request.email)
          //send mail with text password
          mailDataObject = {
            to: request.email,
            userName: request.userName,
            from: 'ladynaad@gmail.com',
            subject: 'Password Reset',
            textPassword: req.body.textPassword
          };
          mailService.mailServer('request', mailDataObject);
        } else {
          console.log(query)
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

//get all requests
router.get('/', function (req, res) {
  query = `Select * from requests`;
  db.query(query, function (err, rows) {
    if (!err) {
      if (isEmpty(rows)) {
        console.log(`No Requests Created`);
        res.status(404);
        res.json({
          status: 404,
          message: 'No Requests Created'
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
})

function updateUserPassword(password, email) {
  console.log(email + ' -> ' + password);
  let updateQuery = `Update users set password = ? where email = '${email}'`;
  db.query(updateQuery, password, function (err, rows) {
    if(!err) {
      console.log('Updating user email: '+ email +' with password: ' + password);
      console.log(rows)
      return true;
    } else {
      console.log(err);
    }
  })
}
module.exports = router;