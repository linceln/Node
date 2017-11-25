`use strict`

const nunjucks = require('nunjucks');

function createEnvironment(path, opts) {
    var autoescape = opts.autoescape === undefined ? true : opts.autoescape;
    var noCache = opts.noCache || false;
    var watch = opts.watch || false;
    var throwOnUndefined = opts.throwOnUndefined || false;
    var environment = new nunjucks.Environment(
        new nunjucks.FileSystemLoader(path,
            {
                noCache: noCache,
                watch: watch
            },
            {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            })
    );
    if (opts.filters) {
        for (let f in opts.filters) {
            environment.addFilter(f, opts.filters[f]);
        }
    }
    return environment;
}

module.exports = function (path, opts) {
    var environment = createEnvironment(path, opts);
    return async (ctx, next) => {
        // 为 ctx 绑定 render() 函数
        ctx.render = function (view, model) {
            ctx.response.body = environment.render(view, Object.assign({}, ctx.state || {}, model || {}));
            ctx.response.type = 'text/html';
        }
        await next();
    }
}