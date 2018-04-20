const express = require('express');
const book = express.Router();
var BOOK_COLLECTION = "books";
var OWNERSHIP_COLLECTION = "ownerships";
var ObjectID = require('mongodb').ObjectID;

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

book.get("/", function(req, res) {
  db.collection(BOOK_COLLECTION).find({}).toArray((err, docs) => {
    if (err) {
      handleError(res, err.message, "Failed to get books.");
    } else {
      res.status(200).json(docs);
    }
  });
});

book.get("/user/:username", function(req, res) {
  db.collection(OWNERSHIP_COLLECTION).find({owner:req.body.username},{title:1,bookId:1,type:1,_id:0}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get books.");
    } else {
      res.status(200).json(docs);
    }
  });
});


book.post("", function(req, res) {
  var newbook = req.body;
  newbook.createDate = new Date();

  db.collection(BOOK_COLLECTION).insertOne(newbook, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new book.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

book.get("/:bookId", function(req, res) {
  db.collection(BOOK_COLLECTION).findOne({ bookId: req.params.bookId }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get book");
    } else {
      res.status(200).json(doc);
    }
  });
});

book.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(BOOK_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update book");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

book.delete("/:id", function(req, res) {
  db.collection(BOOK_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete book");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = book;