`use strict`

const model = require('./model');

(async () => {
    await model.sync();
    console.log('Init DB OK! ');
    // process.exit(0)
})();