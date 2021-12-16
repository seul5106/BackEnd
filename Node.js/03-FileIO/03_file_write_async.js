var fs = require("fs");
var target = "./output_sync.txt";

if (fs.existsSync(target)) {
    var data = fs.readFileSync(target, "utf8");
    console.log(data);
} else {
    console.log(target + "파일이 존재하지 않습니다.")
}