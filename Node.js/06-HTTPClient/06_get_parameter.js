const axios = require('axios');

(async() => {
    let result = null;
    try {
        const response = await axios.get("http://itpaper.co.kr/data/get.php", {
            params: {
                num1: 100,
                num2: 200
            }
        });
        result = response.data;
    } catch (error) {
        const errorMsg = "[" + error.response.status + "] " + error.response.statusText;
        console.error(errorMsg);
        return;
    }
    console.log("다른 백엔드로부터 응답받은 결과값: " + result);
})();