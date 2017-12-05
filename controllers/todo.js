`use strict`

const model = require('../model');

const APIError = require('../rest').APIError;

var fn_todo_list_html = async (ctx, next) => {
    ctx.render('todo.html', {
        title: '待办事项'
    });
}

var fn_todo_list = async (ctx, next) => {
    let Todo = model.Todo;
    var todoList = await Todo.findAll({
        order: [
            ['rank', 'DESC'],
            ['updatedAt', 'DESC'],
            ['id', 'DESC']
        ]
    });
    ctx.rest({todoList: todoList})
}

var fn_create_todo = async (ctx, next) => {
    let title = ctx.request.body.title;
    if (!title.trim()) {
        throw new APIError('Empty', 'Title cannot be empty!');
    }
    let description = ctx.request.body.description;
    if (!description.trim()) {
        throw new APIError('Empty', 'Descrition cannot be empty!')
    }
    let rank = ctx.request.body.rank;
    let Todo = model.Todo;
    var newTodo = await Todo.create({
        title: title,
        description: description,
        rank: rank || 0
    })
    ctx.rest({todo: newTodo})
}

var fn_update_todo = async (ctx, next) => {
    let id = ctx.params.id;
    if (!id.trim()) {
        throw new APIError('Empty', 'Todo ID cannot be empty!')
    }
    let title = ctx.request.body.title;
    let description = ctx.request.body.description;
    let rank = ctx.request.body.rank;
    let Todo = model.Todo;
    let todo = await Todo.findOne({
        where: {id: id}
    });
    if (title) {
        todo.title = title;
    }
    if (description) {
        todo.description = description;
    }
    if (rank) {
        todo.rank = rank
    }
    await todo.save();
    ctx.rest({todo: todo})
}

var fn_delete_todo = async (ctx, next) => {
    let id = ctx.params.id;
    if (!id.trim()) {
        throw new APIError('Empty', 'Todo ID cannot be empty!')
    }
    let Todo = model.Todo;
    await Todo.destroy({
        where: {
            id: id
        }
    });
    ctx.rest({});
}

module.exports = {
    'GET /todo.html': fn_todo_list_html,
    'GET /api/v1/todos': fn_todo_list,
    'POST /api/v1/todos': fn_create_todo,
    'PUT /api/v1/todos/:id': fn_update_todo,
    'DELETE /api/v1/todos/:id': fn_delete_todo
}