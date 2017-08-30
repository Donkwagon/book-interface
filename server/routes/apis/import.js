const express = require('express');
const imp = express.Router();

const USER_COLLECTION =            "books";

var ObjectID = require('mongodb').ObjectID;

var request = require('request');
var cheerio = require('cheerio');


function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

////////////////////////////////////////////////////////////////////////////////
//Get user list
imp.get("/users", function(req, res) {
    const query = {
        text: 'SELECT * FROM users'
    }

    pgClient.query(query, (err, res) => {
        if (err) {
            console.log(err.stack)
        } else {
            db.collection(USER_COLLECTION).insertMany(res.rows, function(err, doc) {
                if (err) {

                    handleError(res, err.message, "Failed to create new security.");
                } else {
                }
            });
        }
    })
});




module.exports = imp;