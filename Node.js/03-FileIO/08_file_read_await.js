var fs = require("fs");
var target = "./output_promise.txt";

if (fs.existsSync(target)) {
    fs.promises
        .readFile(target, "utf8")
        .then((data) => {
            console.debug("파일읽기 완료.");
            console.debug(data);
        })
        .catch((err) => {
            console.error("파일읽기 실패");
            console.error(err);
        })
    console.log(target + "파일을 읽도록 요청했습니다.");
} else {
    console.log(target + "파일이 존재하지 않습니다.");
}