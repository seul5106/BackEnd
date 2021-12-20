const axios = require('axios');
const FormData = require('form-data');
(async() => {
    let result = null;
    try {
        const form = new FormData();

        form.append('num1', 200);
        form.append('num2', 300);

        const response = await axios.post("http://itpaper.co.kr/data/post.php", form, {
            headers: form.getHeaders()
        });
        result = response.data;
    } catch (error) {
        const errorMsg = "[" + error.response.status + "] " + error.response.statusText;
        console.error(errorMsg);
        return;
    }
    console.log("다른 백엔드로부터 응답받은 결과값: " + result);
})();