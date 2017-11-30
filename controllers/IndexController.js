
`use strict`

const model = require('../model');

var fn_index = async (ctx, next) => {
    ctx.render('index.html', {
        title: 'Welcome'
    });
}

var fn_signin = async (ctx, next) => {
    var name = ctx.request.body.name || '';
    var password = ctx.request.body.password || '';
    if (name === 'koa@gmail.com' && password === '12345') {
        ctx.render('signin-ok.html', {
            title: 'Sigin In OK',
            name: pet.name
        });
    } else {
        ctx.render('signin-failed.html', {
            title: 'Sign In Failed'
        });
    }

}

module.exports = {
    'GET /': fn_index,
    'POST /signin': fn_signin
}