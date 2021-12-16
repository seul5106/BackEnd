const fs = require("fs");
const target = "./output_await.txt";
const content = "Hello World";
const isExists = fs.existsSync(target);

if (!isExists) {
    const myWrite = async() => {
        try {
            await fs.promises.writeFile(target, content);
            console.debug("저장완료");
        } catch (err) {
            console.error("에러발생");
            console.error(err);
        }
    }

    myWrite();
    console.log(target + "의 파일 저장을 요청했습니다.");
} else {
    (async() => {
        try {
            await fs.promises.unlink(target);
            console.debug("삭제완료");
        } catch (err) {
            console.error("에러발생");
            console.error(err);
        }


    })();

    console.log(target + "의 파일 삭제를 요청했습니다.")

}