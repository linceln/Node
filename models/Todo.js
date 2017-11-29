`use strict`

var db = require('../db');

var Todo = db.defineModel('todo', {
    id: {
        type: db.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    title: db.STRING(255),
    description: db.STRING(255),
    rank: db.INTEGER
})

module.exports = Todo;