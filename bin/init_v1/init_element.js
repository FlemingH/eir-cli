var copy_file = require("../util/copy_file");
var path = require('path')

function createByElementui () {
    console.log("init project...");
    try {
        var from = path.join(__dirname, '../../templates/templates_v1/templates_elementui');
        copy_file.copyFolder(from, '.');
    } catch (e) {
        console.log('init fail');
    }
    console.log("init complete!\n");
    console.log('① run\tnpm init\n');
    console.log('② run\tnpm install\n')
}

module.exports = {
    createByElementui,
}