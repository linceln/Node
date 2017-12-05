`use strict`

const model = require('../model');

var fn_pet_list = async (ctx, next) => {
    let Pet = model.Pet;
    let pets = await Pet.findAll();
    ctx.rest({
        pets: pets
    })
}

var fn_create_pet = async (ctx, next) => {
    let Pet = model.Pet;
    let pet = await Pet.create({
        categoryId: 1,
        name: 'NodeJS',
        gender: 1,
        birthday: Date.now()
    })
    ctx.rest({
        code: 1,
        pet: pet.name
    })
}

module.exports = {
    'GET /api/v1/pets': fn_pet_list,
    'POST /api/v1/pets': fn_create_pet
}