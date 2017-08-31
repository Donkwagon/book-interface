const express = require('express');
const user = express.Router();
var USER_COLLECTION = "users";
var PASSWORD_COLLECTION = "user_passwords"
var ObjectID = require('mongodb').ObjectID;

var bcrypt = require('bcrypt');
const saltRounds = 10;

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

user.get("", function(req, res) {
  db.collection(USER_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get users.");
    } else {
      res.status(200).json(docs);
    }
  });
});

user.get("/site/:siteName", function(req, res) {
  db.collection(USER_COLLECTION).find({siteName: req.params.siteName}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get users.");
    } else {
      res.status(200).json(docs);
    }
  });
});

user.post("/login", function(req, res) {
  var user = req.body;
  console.log(user);

  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(user.password, salt, function(err, hash) {
  
      var user_password = {
        email: user.email,
        password: hash
      }
      
      db.collection(PASSWORD_COLLECTION).find({email:user.email,password:hash}).toArray(function(err, doc) {
  
        if (err) {handleError(res, err.message, "Failed to create new user.");}
        else {

          db.collection(USER_COLLECTION).find({email:user.email}).toArray(function(err, doc) {

            if (err) {handleError(res, err.message, "Failed to create new user.");}
            else {res.status(200).json(doc);}

          });

        }
        
      });
    });
  });
});

user.post("", function(req, res) {
  var newuser = req.body;
  newuser.created_at = new Date();
  newuser.updated_at = new Date();

  bcrypt.genSalt(saltRounds, function(err, salt) {

      bcrypt.hash(newuser.password, salt, function(err, hash) {

        var user_password = {
          username: newuser.username,
          email:newuser.email,
          password: hash
        }
        
        db.collection(PASSWORD_COLLECTION).insertOne(user_password, function(err, doc) {

          if (err) {handleError(res, err.message, "Failed to create new user.");}
          else {

            delete newuser.password;

            db.collection(USER_COLLECTION).insertOne(newuser, function(err, doc) {

              if (err) {handleError(res, err.message, "Failed to create new user.");}
              else {res.status(200).json(doc);}

            });
            
          }

        });
      });
  });
});

user.get("/:id", function(req, res) {
  db.collection(USER_COLLECTION).findOne({ _id: new ObjectID(req.params.id) }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get user");
    } else {
      res.status(200).json(doc);
    }
  });
});

user.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(USER_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update user");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

user.delete("/:id", function(req, res) {
  db.collection(USER_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete user");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = user;