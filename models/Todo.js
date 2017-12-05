`use strict`

const db = require('../db');

var Todo = db.defineModel('todo', {
    title: db.STRING(255),
    description: db.STRING(255),
    rank: db.INTEGER
})

module.exports = Todo;