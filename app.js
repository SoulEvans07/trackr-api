const { port, env } = require('./config/vars');
const mongoose = require('./config/mongoose');
const app = require('./config/express');

Array.prototype.asyncForEach = async function (callback) {
    for (let index = 0; index < this.length; index++) {
        await callback(this[ index ])
    }
};

mongoose.connect();

app.listen(port, () => console.log('App running on: localhost:' + port + ' env: ' + env));
