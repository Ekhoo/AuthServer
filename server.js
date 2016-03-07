var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var router = express.Router();
var mongoOp = require("./db/mongo");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : true}));

router.get("/", function(req, res) {
  res.json({"error": false, "message": "Hello World"});
});

router.route("/user")
  .post(function(req, res) {
      var db = new mongoOp();
      var response = {};

      db.email = req.body.email;
      db.password = require("crypto").createHash("sha1").update(req.body.password).digest("base64")

      db.save(function (err, data) {
          if (err) {
              response = {"error": true, "message": "Error adding user"}
          } else {
              response = {"error": false, "message" : data};
          }

          res.json(response);
      });
  });

router.route("/user/:id")
    .get(function (req, res) {
        var response = {};

        mongoOp.findById(req.params.id, function (err, data) {
            if (err) {
                response = {"error": true, "message": "Error getting user"}
            } else {
                response = {"error": false, "message": data}
            }

            res.json(response);
        })
    })
    .put(function (req, res) {
        var response = {};

        mongoOp.findById(req.params.id, function(err, data) {
            if (err) {
                response = {"error": true, "message": "Error getting user"}
            } else {
              if (req.body.email !== undefined) {
                  data.email = req.body.email;
              }

              if (req.body.password !== undefined) {
                  data.password = require("crypto").createHash("sha1").update(req.body.password).digest("base64");
              }

              data.save(function (err, data) {
                if (err) {
                    response = {"error" : true,"message" : "Error updating data"};
                } else {
                    response = {"error" : false,"message" : data};
                }

                res.json(response);
              });
            }
        });
    })
    .delete(function (req, res) {
        var response = {};

        mongoOp.findById(req.params.id, function(err, data) {
            if (err) {
                response = {"error": true, "message": "Error getting user"}
            } else {
              mongoOp.remove({_id: req.params.id}, function (err) {
                if (err) {
                  response = {"error" : true,"message" : "Error deleting data"};
                } else {
                  response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                }

                res.json(response);
              });
            }
        });
    });

app.use("/", router);

app.listen(3000);
console.log("Server listen on port 3000");
