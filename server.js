var express = require('express');
var path = require('path');
var app = express();

var aws = require('aws-sdk')
var multer = require('multer')
var multerS3 = require('multer-s3')

var s3 = new aws.S3({ /* ... */ })

var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: 'hueimageupload',
    metadata: function (req, file, cb) {
      cb(null, {fieldName: file.fieldname});
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    }
  })
})

app.use(express.static('public'));

app.get('/*', function(req, res){
  res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.post('/upload', upload.array('photos', 3), function(req, res, next) {
  res.send('Successfully uploaded ' + req.files.length + ' files!')
})

var server = app.listen(process.env.PORT || 3000, function() {
  console.log('Listening on port', server.address().port);
});
