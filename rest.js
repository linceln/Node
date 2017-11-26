`use strict`

module.exports = {
    restify: (pathPrefix) => {
        // RESTFUL API 默认前缀
        pathPrefix = pathPrefix || '/api/';
        return async (ctx, next) => {
            if (ctx.request.path.startsWith(pathPrefix)) {
                // 给 ctx 绑定 rest() 方法
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }
            }
            await next();
        }
    }
}