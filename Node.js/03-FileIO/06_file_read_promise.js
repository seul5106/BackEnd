var fs = require("fs");
var target = "./output_await.txt";

if (fs.existsSync(target)) {
    let data = null;
    (async() => {
        try {
            data = await fs.promises.readFile(target, "utf8");
            console.debug("파일읽기 완료");
        } catch (err) {
            console.error("파일읽기 실패");
            console.error(err);
        }

        console.debug(data);
    })();
    console.log(target + "파일을 읽도록 요청했습니다.");
} else {
    console.log(target + "파일이 존재하지 않습니다.");
}