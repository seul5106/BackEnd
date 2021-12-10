function get_actor_search(query) {

    const xhr = new XMLHttpRequest();
    const method = "GET";
    const url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json?key=e41f0d679a6d86c1b0271ce7a423b325&peopleNm=" + query + "&itemPerPage=1";

    xhr.onreadystatechange = e => {
        const {
            target
        } = e;

        if (target.readyState == XMLHttpRequest.DONE) {
            if (target.status == 200) {
                const req = JSON.parse(target.response);
                console.log(query);
                let peopleDe = req.peopleListResult.peopleList[0].peopleCd;
                console.log(peopleDe)
                get_detail_actior(peopleDe);

            } else {
                const s = parseInt(target.status / 100);
                let errMsg = null;
                if (s == 4) {
                    errMsg = "[" + target.status + "]" + target.statusText + "- 요청 주소가 잘못되었습니다.";
                } else if (s == 5) {
                    errMsg = "[" + target.status + "]" + target.statusText + "- 서버의 응답이 없습니다.";
                } else {
                    errMsg = "[" + target.status + "]" + target.statusText + "- 요청에 실패했습니다.";
                }
                alert(errMsg);
            }
        }
    };
    xhr.open(method, url);
    xhr.send();
}

function get_detail_actior(peopleDe) {

    const xhr = new XMLHttpRequest();
    const method = "GET";
    const url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleInfo.json?key=e41f0d679a6d86c1b0271ce7a423b325&peopleCd=" + peopleDe;

    xhr.onreadystatechange = e => {
        const {
            target
        } = e;

        if (target.readyState == XMLHttpRequest.DONE) {
            if (target.status == 200) {
                const req = JSON.parse(target.response);
                let filmo = req.peopleInfoResult.peopleInfo.filmos;
                console.log(filmo);
                filmo.map((v, i) => {
                    console.log(filmo[i].movieCd);
                    let movieCd = filmo[i].movieCd
                    get_movie_Fpc(movieCd);
                });
            } else {
                const s = parseInt(target.status / 100);
                let errMsg = null;
                if (s == 4) {
                    errMsg = "[" + target.status + "]" + target.statusText + "- 요청 주소가 잘못되었습니다.";
                } else if (s == 5) {
                    errMsg = "[" + target.status + "]" + target.statusText + "- 서버의 응답이 없습니다.";
                } else {
                    errMsg = "[" + target.status + "]" + target.statusText + "- 요청에 실패했습니다.";
                }
                alert(errMsg);
            }
        }
    };


    xhr.open(method, url);
    xhr.send();
}

function get_movie_Fpc(movieCd) {

    const xhr = new XMLHttpRequest();
    const method = "GET";
    const url = "http://www.kobis.or.kr/kobisopenapi/webservice/rest/movie/searchMovieInfo.json?key=e41f0d679a6d86c1b0271ce7a423b325&movieCd=" + movieCd;

    xhr.onreadystatechange = e => {
        const {
            target
        } = e;

        if (target.readyState == XMLHttpRequest.DONE) {
            if (target.status == 200) {
                const req = JSON.parse(target.response);
                const movieNm = req.movieInfoResult.movieInfo.movieNm;
                console.log(movieNm);
            } else {
                const s = parseInt(target.status / 100);
                let errMsg = null;
                if (s == 4) {
                    errMsg = "[" + target.status + "]" + target.statusText + "- 요청 주소가 잘못되었습니다.";
                } else if (s == 5) {
                    errMsg = "[" + target.status + "]" + target.statusText + "- 서버의 응답이 없습니다.";
                } else {
                    errMsg = "[" + target.status + "]" + target.statusText + "- 요청에 실패했습니다.";
                }
                alert(errMsg);
            }
        }
    };


    xhr.open(method, url);
    xhr.send();
}