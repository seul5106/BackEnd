module.exports = (app) => {
    const router = require('express').Router();
    const logger = require('../../helper/LogHelper'); //프론트엔드에서 디버깅이 안되기 때문에 로그로 남김
    const axios = require('axios'); //비동기화 처리를 위한 axios
    router.route("/today_covid19/:region").get((req, res, next) => { //URL파라미터 처리를 위한 라우터 등록
        (async() => {                                                //전달 받은 URL파라미터는 GET파라미터와 같은 방법으로 사용가능
            let regions = req.params.region; //파라미터로 넘겨받은 값을 저장할 변수
            let json = null; //json변수 초기화
            try {
                const response = await axios.get("http://itpaper.co.kr/demo/covid19/now.php");
                json = response.data.state; //json변수에 불러온 데이터를 저장
                logger.debug("json 데이터 불러오기 성공");
            } catch (error) { //데이터를 불러올 때 실패했을 경우 에러메시지 출력 
                const errorMsg = "[" + error.response.status + "] " + error.response.statusText;
                console.log(errorMsg);
                return;
            }
            json.map((v, i) => { //불러온 데이터를 map함수로 탐색
                let today = parseInt(v.confirmed) - parseInt(v.confirmed_prev); //현재 확진자수에서 전날 확진자수를 빼면 오늘 확진자 수가 나옴 
                if (regions == v.region) {  //불러온 파라미터값과 탐색한 json데이터값이 일치할 경우
                    const result = { //json형태로 값을 저장
                        "확진": today
                    }
                    logger.debug("오늘 확진자 조회 완료");
                    res.status(200).send(result); //브라우저에 전달할 결과
                }
            });
        })();
    });
    return router;
}