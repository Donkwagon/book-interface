const express = require('express');
const tag = express.Router();
var TAG_COLLECTION = "tags";
var ObjectID = require('mongodb').ObjectID;

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

tag.get("", function(req, res) {
  db.collection(TAG_COLLECTION).find({},{title:1,tagId:1,_id:0}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get tags.");
    } else {
      res.status(200).json(docs);
    }
  });
});


tag.post("", function(req, res) {
  var newtag = req.body;
  newtag.createDate = new Date();

  db.collection(TAG_COLLECTION).insertOne(newtag, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new tag.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

tag.get("/:tagId", function(req, res) {
  db.collection(TAG_COLLECTION).findOne({ tagId: req.params.tagId }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get tag");
    } else {
      res.status(200).json(doc);
    }
  });
});

tag.put("/:id", function(req, res) {
  var updateDoc = req.body;
  delete updateDoc._id;

  db.collection(TAG_COLLECTION).updateOne({_id: new ObjectID(req.params.id)}, updateDoc, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to update tag");
    } else {
      updateDoc._id = req.params.id;
      res.status(200).json(updateDoc);
    }
  });
});

tag.delete("/:id", function(req, res) {
  db.collection(TAG_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete tag");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = tag;