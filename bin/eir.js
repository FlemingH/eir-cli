#! node

var init_v1 = require("../bin/init_v1/init_element");

process.argv.slice(2).forEach(function (item) {
    switch (item) {
        case "create":
            init_v1.createByElementui();
            break;
        case "createby":
            init_v1.createByElementui();
            break;
    }
});