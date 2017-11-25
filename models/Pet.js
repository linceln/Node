`use strict`

const db = require('../db');

var Pet = db.defineModel('pet', {
    id: {
        type: db.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    categoryId: db.INTEGER,
    name: db.STRING(100),
    gender: db.INTEGER,
    birth: db.STRING(10)
})

module.exports = Pet;