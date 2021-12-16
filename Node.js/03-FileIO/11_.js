var fs = require("fs");
var target = "./docs";

if (!fs.existsSync(target)) {
    fs.mkdir(target, err => {
        if (err) {
            console.log(err);
            return;
        }
        fs.chmodSync(target, 0777);
        console.log("새로운 %s 폴더를 만들었습니다.", target);
    });
    console.log("%s 폴더의 생성을 요청했습니다", target);
} else {
    fs.rmdir(target, err => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("%s 폴더를 삭제했습니다.", target);
    });
    console.log("%s 폴더의 삭제를 요청했습니다", target);
}