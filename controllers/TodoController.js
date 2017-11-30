`use strict`

const model = require('../model');

var fn_todo_list_html = async (ctx, next) => {
    ctx.render('todo.html');
}

var fn_todo_list = async (ctx, next) => {
    let Todo = model.Todo;
    var todoList = await Todo.findAll();
    ctx.rest({
        code: 1,
        title: '待办事项',
        message: '获取成功',
        todoList: todoList
    })
}

var fn_create_todo = async (ctx, next) => {
    let title = ctx.request.body.title;
    let description = ctx.request.body.description;
    let rank = ctx.request.body.rank;
    let Todo = model.Todo;
    var newTodo = await Todo.create({
        title: title,
        description: description,
        rank: rank || 0
    })
    ctx.rest({
        code: 1,
        message: '成功新建一条待办事项'
    })
}

module.exports = {
    'GET /todo.html': fn_todo_list_html,
    'GET /api/v1/todos': fn_todo_list,
    'POST /api/v1/todos': fn_create_todo
}