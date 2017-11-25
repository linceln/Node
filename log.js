`use strict`

var fn_log = async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const end = new Date().getTime();
    console.log(`${ctx.request.method} ${ctx.request.url} ${end - start}ms`);
}

module.exports = fn_log;