const axios = require('axios');
//e41f0d679a6d86c1b0271ce7a423b325
(async() => {
    let json = null;
    try {
        const response = await axios.get("http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json", {
            params: {
                key: "e41f0d679a6d86c1b0271ce7a423b325",
                targetDt: "20211216"
            }

        });
        json = response.data.boxOfficeResult.dailyBoxOfficeList;
    } catch (error) {
        const errorMsg = "[" + error.response.status + "] " + error.response.statusText;
        console.log(errorMsg);
        return;
    }
    json.map((v, i) => {
        console.log("영화제목 : " + v.movieNm + "  순위 : " + v.rnum + "  관객수 : " + v.audiCnt);
    })
})();