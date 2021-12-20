const axios = require('axios');

const url = "http://itpaper.co.kr/data/simple_text.txt";

(async() => {
    let result = null;
    try {
        const response = await axios.get(url);
        result = response.data;
    } catch (err) {
        const errMsg = "[" + err.response.status + "] " + err.response.statusText;
        console.log("즉시 실행 함수 방식 - " + errMsg);
        return;
    }

    console.log("Async-await 방식 - " + result);
})();

console.log("async/await + 즉시 실행 함수 방식으로 HTTP 요청");