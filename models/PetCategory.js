`use strict`

const db = require('../db');

var PetCategory = db.defineModel('petCategory', {
    id: {
        type: db.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    category: db.STRING(100)
})

module.exports = PetCategory;