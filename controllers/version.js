`use strict`

const model = require('../model');
const APIError = require('../rest').APIError;
const fs = require('fs');
const path = require('path');

var fn_version_html = async (ctx, next) => {
    ctx.render('version/version.html', {})
}

var fn_get_version_list = async (ctx, next) => {
    let versions = await model.Version.findAll({
        order: [['device']]
    })
    ctx.rest({ versions: versions });
}

var fn_update_version = async (ctx, next) => {
    let device = ctx.request.body.device;

    let url = ctx.request.body.url || '';

    let versionName = ctx.request.body.versionName;

    let open = ctx.request.body.open;

    let force = ctx.request.body.force;

    if (!device) {
        throw new APIError('Empty', 'Device cannot be empty!');
    }
    if (device == 1 /*Android*/
        && !url) {// Android 的 APK安装包路径必填
        throw new APIError('Empty', 'Url cannot be empty!');
    }
    if (!versionName) {
        throw new APIError('Empty', 'Version cannot be empty');
    }

    let version = await model.Version.findOne({
        where: {
            device: device
        }
    });

    if (!version) {
        version = await model.Version.create({
            device: device,
            url: url,
            versionName: versionName,
            open: open,
            force: force
        });
    } else {
        version.device = device;
        version.url = url;
        version.versionName = versionName;
        version.open = open;
        version.force = force;
        await version.save();
    };
    ctx.rest({});
}

/**
 * 文件上传
 * @param {*} ctx 
 * @param {*} next 
 */
var fn_upload_apk = async (ctx, next) => {
    let file = ctx.request.body.files.file;
    if (file.size > 0) {
        let newPath = path.join(process.cwd(), 'apk');
        if (!fs.existsSync(newPath)) {
            fs.mkdirSync(newPath);
        }
        var newFilePath = path.join(newPath, file.name);
        let writeStream = fs.createWriteStream(newFilePath);
        await fs.createReadStream(file.path).pipe(writeStream);
    } else {
        throw new APIError('Empty', 'File is empty!')
    }
    ctx.rest({
        url: path.join('apk', file.name),
        message: "上传成功"
    });
}

module.exports = {
    'GET /version.html': fn_version_html,
    'GET /api/v1/versions': fn_get_version_list,
    'POST /api/v1/versions': fn_update_version,
    'POST /api/v1/apk': fn_upload_apk
}