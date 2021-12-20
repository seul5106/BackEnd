const axios = require('axios');

const 접속주소 = "http://itpaper.co.kr/demo/covid19/now.php";

(async() => {
    let json = null;
    try {
        const response = await axios.get(접속주소);
        json = response.data;
    } catch (error) {
        const errorMsg = "[" + error.response.status + "] " + error.response.statusText;
        console.log(errorMsg);
        return;
    }
    let total = null;
    json.state.map((v, i) => {
        const confirmed = v.confirmed - v.confirmed_prev;
        console.log("[" + v.region + "] 확진자: " + confirmed);
        total += confirmed;
    });

    console.log("오늘 총 확진자 수: %d", total);
})();