`use strict`

const model = require('../model');
const APIError = require('../rest').APIError;
const fs = require('fs');
const path = require('path');

var fn_version_html = async (ctx, next) => {
    ctx.render('version.html', {})
}

var fn_get_version_list = async (ctx, next) => {
    let versions = await model.Version.findAll({
        order: [['device']]
    })
    ctx.rest({ versions: versions });
}

var fn_update_version = async (ctx, next) => {
    let device = ctx.response.body.device;

    let url = ctx.response.body.url || '';

    let versionName = ctx.response.body.version;

    let open = ctx.respons.body.open || false;

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
            open: open ? 1 : 0
        });
    } else {
        version.device = device;
        version.device = url;
        version.device = versionName;
        version.open = open ? 1 : 0;
        await version.save();
    }
    ctx.rest({});
}

var fn_upload_apk = async (ctx, next) => {
    let file = ctx.request.body.files.file;
    if (file.size > 0) {
        let newPath = path.join(__dirname, 'apk');
        if (!fs.existsSync(newPath)) {
            fs.mkdirSync(newPath);
        }
        let newFilePath = path.join(newPath, file.name);
        let writeStream = fs.createWriteStream(newFilePath);
        await fs.createReadStream(file.path).pipe(writeStream);
    }
    ctx.rest({
        message: "上传成功"
    });
}

module.exports = {
    'GET /version.html': fn_version_html,
    'GET /api/v1/versions': fn_get_version_list,
    'POST /api/v1/versions': fn_update_version,
    'POST /api/v1/apk': fn_upload_apk
}