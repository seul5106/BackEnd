class Modules {

    // 데이터를 저장하기 위한 전역변수
    data = {
        web: null,
        blog: null,
        cafe: null
    };
    query = null;



    /** Ajax를 통해 데이터 가져오기 */
    search(type) {
        const xhr = new XMLHttpRequest();
        const method = 'GET';

        // 링크에 숨겨진 data-deptno값을 백엔드에 전송함
        const url = 'https://dapi.kakao.com/v2/search/' + type + '?query=' + query + '&page=1&size=50';

        xhr.onreadystatechange = (e) => {
            const { target } = e;

            if (target.readyState == XMLHttpRequest.DONE) {
                if (target.status == 200) {
                    const req = JSON.parse(target.response);


                    // 가져온 데이터를 전역변수에 저장
                    this.data[type] = req.documents;

                    if (type == 'web') {
                        this.printData(type);
                    }
                } else {
                    const s = parseInt(target.status / 100);
                    let errMsg = null;

                    if (s == 4) {
                        errMsg = '[' + target.status + '] ' + target.statusText + ' - 요청 주소가 잘못되었습니다.';
                    } else if (s == 5) {
                        errMsg = '[' + target.status + '] ' + target.statusText + ' - 서버의 응답이 없습니다.';
                    } else {
                        errMsg = '[' + target.status + '] ' + target.statusText + ' - 요청에 실패했습니다.';
                    }

                    alert(errMsg);
                }
            }
        };

        xhr.open(method, url);
        xhr.setRequestHeader('Authorization', 'KakaoAK b636ff83df45f778874b079dcb979102');
        xhr.send();
    }


    /** 화면에 data의 내용을 출력하는 메서드 */
    printData(type) {
        const list = document.querySelector('#list');

        Array.from(list.getElementsByTagName('li')).map((v, i) => {
            list.removeChild(v);
        });

        this.data[type].map((v, i) => {
            console.log(v);

            const li = document.createElement('li');
            list.appendChild(li);

            const a = document.createElement('a');
            a.setAttribute('href', v.url);
            a.setAttribute('target', '_blank');
            li.appendChild(a);

            if (type != 'web') {
                a.classList.add('use-thumbnail');

                const span0 = document.createElement('span');
                span0.classList.add('thumbnail');

                if (!v.thumbnail) {
                    v.thumbnail = "noimage.jpg"
                }
                span0.style.backgroundImage = "url('" + v.thumbnail + "')";
                a.appendChild(span0);
            }

            const h2 = document.createElement('h2');
            h2.innerHTML = v.title;
            a.appendChild(h2);

            const p = document.createElement('p');
            p.innerHTML = v.contents;
            a.appendChild(p);

            if (type != 'web') {
                const span1 = document.createElement('span');

                if (type == 'blog') {
                    span1.innerHTML = v.blogname;
                } else if (type == 'cafe') {
                    span1.innerHTML = v.cafename;
                }

                span1.classList.add('info');
                a.appendChild(span1);
            }

            const date = new Date(v.datetime);

            const span2 = document.createElement('span');
            span2.innerHTML = date.toLocaleString();
            span2.classList.add('info');
            a.appendChild(span2);
        });
    }


}