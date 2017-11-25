`use strict`

const model = require('../model');

var fn_create_pet = async (ctx, next) => {
    let name = ctx.request.body.name;
    let gender = ctx.request.body.gendar;
    let categoryId = ctx.request.body.categoryId;
    let birth = ctx.request.body.birth;
    let Pet = model.Pet;

    let new_pet = await Pet.create({
        name: name,
        gender: gender,
        categoryId: categoryId,
        birth: birth,
    })
    
    ctx.render('pet-list.html', {
        title: 'create pet',
        name: new_pet.name
    })
}

var fn_pet_list = async (ctx, next) => {
    let Pet = model.Pet;
    let pet_list = await Pet.findAll();
    let PetCategory = model.PetCategory;
    let petCategoryList = await PetCategory.findAll({
        attributes: ['id', 'category']
    });
    ctx.render('pet-list.html', {
        title: 'pet-list',
        name: JSON.stringify(petCategoryList)
    })
}

module.exports = {
    'POST /pets': fn_create_pet,
    'GET /pets': fn_pet_list
}