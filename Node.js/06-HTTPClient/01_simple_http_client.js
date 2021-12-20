const http = require('http');

const url = "http://itpaper.co.kr/data/simple_text.txt";

let req = http.get(url, function(res) {
    let resData = "";
    res.on("data", function(chunk) {
        resData += chunk
    });

    res.on("end", function() {
        console.log(resData);
    });
});

req.on("error", function(err) {
    console.log(err);
    console.log("에러 발생 : " + err.message);
});