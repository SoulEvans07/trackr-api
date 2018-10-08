var mongoose = require('mongoose');
var uri = 'mongodb://localhost/trackr-api';

mongoose.connect(uri, { useMongoClient: true });
console.log(uri);

module.exports = mongoose;
