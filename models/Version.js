`use strict`

const db = require('../db');

var Version = db.defineModel('version', {
    versionName: db.STRING(255),
    device: db.INTEGER(11),
    url: db.STRING(255),
    open: db.INTEGER(11),
    force: db.INTEGER(11)
})

module.exports = Version;