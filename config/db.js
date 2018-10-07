var mongoose = require('mongoose');
var uri = 'mongodb://localhost/trackr-api';

mongoose.connect(uri);
console.log(uri);

module.exports = mongoose;
