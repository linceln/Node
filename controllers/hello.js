
`use strict`

var fn_hello = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome'
    });
}

module.exports = {
    'GET /hello/:name': fn_hello
}