const express = require('express');
const provider = express.Router();
var PROVIDER_COLLECTION = "providers";
var ObjectID = require('mongodb').ObjectID;

// Generic error handler used by all endpoints.
function handleError(res, reason, message, code) {
  console.log("ERROR: " + reason);
  res.status(code || 500).json({"error": message});
}

provider.get("", function(req, res) {
  db.collection(PROVIDER_COLLECTION).find({}).toArray(function(err, docs) {
    if (err) {
      handleError(res, err.message, "Failed to get providers.");
    } else {
      res.status(200).json(docs);
    }
  });
});

provider.post("", function(req, res) {
  var newprovider = req.body;
  newprovider.createDate = new Date();

  db.collection(PROVIDER_COLLECTION).insertOne(newprovider, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to create new provider.");
    } else {
      res.status(201).json(doc.ops[0]);
    }
  });
});

provider.get("/:providerId", function(req, res) {
  db.collection(PROVIDER_COLLECTION).findOne({ providerId: req.params.providerId }, function(err, doc) {
    if (err) {
      handleError(res, err.message, "Failed to get provider");
    } else {
      res.status(200).json(doc);
    }
  });
});

provider.delete("/:id", function(req, res) {
  db.collection(PROVIDER_COLLECTION).deleteOne({_id: new ObjectID(req.params.id)}, function(err, result) {
    if (err) {
      handleError(res, err.message, "Failed to delete provider");
    } else {
      res.status(200).json(req.params.id);
    }
  });
});

module.exports = provider;