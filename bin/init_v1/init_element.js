var copy_file = require("../util/copy_file");
var path = require('path')

function createByElementui () {
    var from = path.join(__dirname, '../../templates/templates_v1/templates_elementui');
    copy_file.copyFolder(from, '.');
}

module.exports = {
    createByElementui,
}