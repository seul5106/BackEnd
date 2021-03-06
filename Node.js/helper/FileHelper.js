const fs = require('fs');
const path = require('path');

module.exports.mkdirs = (target, permission = 0755) => {
    if (target == undefined || target == null) { return; }


    //target = target.replaceAll("\\", "/");
    target = target.replace(/\\/gi, "/");
    const target_list = target.split("/");

    let dir = "";

    if (target.substring(0, 1) == "/") {
        dir = "/";
    }

    if (target_list[0].indexOf(":") > -1) {
        target_list[0] += "/"
    }

    target_list.map((v, i) => {
        dir = path.join(dir, v);

        if (v == ".") {
            return;
        }

        console.debug(dir);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            fs.chmodSync(dir, permission);
        }
    });
};