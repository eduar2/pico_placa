var express = require('express');
var app = express();
var canDrive = require('./canDriveValidation');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/', function (req, res) {
    let plate = req.body.plateNumber
    let date = req.body.date
    let time = req.body.time
    let checkDrive = canDrive(plate, date, time)
    let body = {result: checkDrive}
    res.send(body);
});

app.listen(3002, function () {
  console.log('Example app listening on port 3002!');
});