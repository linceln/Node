`use strict`

const fs = require('fs');
const path = require('path');
const router = require('koa-router')();

function addControllers(router, dir) {
    dir = dir || 'controllers';
    controllers_dir = path.join(__dirname, dir);;
    console.log(controllers_dir);
    var files = fs.readdirSync(controllers_dir);
    // 过滤出 js 文件
    var js_files = files.filter((f) => {
        return f.endsWith('.js');
    })
    for (var f of js_files) {
        console.log('-------------------------------------------');
        console.log(`Processing controllers: ${f} Starting...`);
        let mapping = require(path.join(controllers_dir, f));
        addMapping(mapping);
        console.log(`Processing controllers: ${f} Done!`);
        console.log('-------------------------------------------');
    }
}

function addMapping(mapping) {
    for (var url in mapping) {
        if (url.startsWith('GET ')) {
            var path = url.substring(4);
            router.get(path, mapping[url]);
            console.log(`Registering GET url: ${url}`);
        } else if (url.startsWith('POST ')) {
            var path = url.substring(5);
            router.post(path, mapping[url]);
            console.log(`Registering POST url: ${url}`);
        } else {
            console.log(`Invalid url: ${url}`);
        }
    }
}

module.exports = function (dir) {
    addControllers(router, dir);
    return router.routes();
}