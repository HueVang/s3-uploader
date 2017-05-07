console.log('Document Loaded v2');

var fileInput = document.getElementById('file_input');
console.log(fileInput.files);
var file = fileInput.files[0];
var filename = file.name;

var getS3UploadCredentialsUrl = '/getS3UploadCredentials';
var xhr = new XMLHttpRequest();
xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
        var response = xhr.responseText;
        response = JSON.parse(response);
        // handle server response here
    }
};
xhr.open("GET", getS3UploadCredentialsUrl + "?filename=" + filename, true);
xhr.send();
