`use strict`

module.exports = {
    // APIError 类
    APIError: function (code, message) {
        this.code = code || 'Internal:unknown_error';
        this.message = message || '';
    },
    rest: (pathPrefix) => {
        // RESTFUL API 默认前缀
        pathPrefix = pathPrefix || '/api/';
        return async (ctx, next) => {
            if (ctx.request.path.startsWith(pathPrefix)) {
                // 给 ctx 绑定 rest() 方法
                ctx.rest = (data) => {
                    ctx.response.type = 'application/json';
                    ctx.response.body = data;
                }
                // RESTFul API 错误处理
                try {
                    await next();
                } catch (error) {
                    ctx.response.status = 400;
                    ctx.response.type = 'application/json';
                    ctx.response.body = {
                        code: error.code || 'Internal:unknown_error',
                        message: error.message || ''
                    };
                }
            } else {
                await next();
            };
        }
    }
}
