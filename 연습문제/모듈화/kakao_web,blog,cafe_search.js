class Calling {
    do_query = null;
    web_data = null;
    cafe_data = null;
    blog_data = null;

    // 전송
    call = (data, do_query) => {
        const xhr = new XMLHttpRequest();
        const method = "GET";
        const url = "https://dapi.kakao.com/v2/search/" + data + "?query=" + do_query + "&page=1&size=20";

        xhr.onreadystatechange = e => {
            const { target } = e;
            if (target.readyState == XMLHttpRequest.DONE) {
                if (target.status == 200) {
                    const req = JSON.parse(target.response);
                    if (data == "web") {
                        this.web_data = req.documents;
                        this.printData("web");
                    } else if (data == "cafe") {
                        this.cafe_data = req.documents;
                        this.printData("cafe");
                    } else if (data == "blog") {
                        this.blog_data = req.documents;
                        this.printData("blog")
                    }
                } else {
                    const s = parseInt(target.status / 100);
                    let errMsg = "null"
                    if (s == 4) {
                        errMsg = `[${target.status}]${target.statusText}- 요청 주소가 잘못되었습니다.`;
                    } else if (s == 5) {
                        errMsg = `[${target.status}]${target.statusText}- 서버의 응답이 없습니다.`;
                    } else {
                        errMsg = `[${target.status}]${target.statusText}- 요청에 실패했습니다.`;
                    }
                    alert(errMsg);
                }
            }
        }
        xhr.open(method, url);
        xhr.setRequestHeader('Authorization', 'KakaoAK a198b5bd50d482160fd20f1a06e9b908')
        xhr.send();
    }

    // 출력
    printData = (data) => {
        // 받아오는 데이터타입의 정보
        let typeofdata = null;
        const list = document.querySelector("#list");
        // 초기화
        Array.from(list.getElementsByTagName("li")).map((v, i) => {
            list.removeChild(v);
        })


        if (data == "web") {
            this.typeofdata = this.web_data;
        } else if (data == "cafe") {
            this.typeofdata = this.cafe_data;
        } else if (data == "blog") {
            this.typeofdata = this.blog_data;
        }


        this.typeofdata.map((v, i) => {
            const li = document.createElement("li");

            const a = document.createElement("a");
            a.setAttribute("href", v.url);
            a.innerHTML = "제목: " + v.title

            const p = document.createElement("p");
            p.innerHTML = "설명: " + v.contents;


            li.appendChild(a);
            a.appendChild(p);

            list.appendChild(li);
        });

    }
}



