const axios = require('axios');

const url = "http://itpaper.co.kr/data/simple_text.txt";

axios
    .get(url)
    .then(function(response) {
        console.log("Promise방식 - " + response.data);
    })
    .catch(function(error) {
        const errorMsg = "[" + error.response.status + "]" + error.response.statusText;
        console.log("Promise방식 - " + errorMsg);
    })
    .then(function() {
        console.log("Promise방식 - fin :)");
    });

console.log("Promise 방식으로 HTTP 요청");