`use strict`

const Koa = require('koa');

const koa = new Koa();

const bodyParser = require('koa-bodyparser');

const controller = require('./controller');

const log = require('./log');

const templating = require('./templating');

const restify = require('./rest');

// 判断是否生产环境
const isProduction = process.env.NODE_ENV === 'production';

koa.use(log);

if (!isProduction) {
    let static = require('./static-files');
    koa.use(static('/static/', __dirname + '/static'));
}

// Add bodyParser middleware to handle POST request
koa.use(bodyParser());

koa.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

koa.use(restify.rest());

koa.use(controller());

koa.listen(8888);

console.log('App started at port 8888...\n');