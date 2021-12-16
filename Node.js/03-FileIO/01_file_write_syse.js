var fs = require("fs");
var target = "./output_sync.txt";

if (fs.existsSync(target)) {
    fs.readFile(target, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            return;
        }
        console.debug(data);
    });
} else {
    console.debug(target + "파일이 존재하지 않습니다.")
}