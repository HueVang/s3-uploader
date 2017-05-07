var express = require('express'),
    path = require('path'),
    aws = require('aws-sdk'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

require('dotenv').config()
aws.config.update({
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  region: process.env.AWS_REGION
});

var app = express(),
    s3 = new aws.S3();

app.use(bodyParser.json());
app.use(express.static('public'));

var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.S3_BUCKET,
        contentType: multerS3.AUTO_CONTENT_TYPE, //Make the content type image/jpeg so the AWS S3 link is viewable
        key: function (req, file, cb) {
            console.log('This is the file:', file);
            cb(null, file.originalname); //use Date.now() for unique file keys
        },
        acl: 'public-read' //Change permission so that anyone can view the file
    })
});

//open in browser to see upload form
app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

//use by upload form
app.post('/upload', upload.any(), function (req, res, next) {
    res.send("Uploaded!");
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
