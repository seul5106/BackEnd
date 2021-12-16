function ajaxPromiseHelper(url, method = "GET", headers = null) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method || 'GET', url);

        if (headers != undefined) {
            for (const key in headers) {
                xhr.setRequestHeader(key, headers[key]);

            }
        }

        xhr.onreadystatechange = (e) => {
            const ajax = e.target;

            if (ajax.readyState == XMLHttpRequest.DONE) {
                if (ajax.status == 200) {

                    const json = JSON.parse(ajax.responseText);

                    resolve(json);

                } else {
                    const s = parseInt(ajax.status / 100);
                    let msg = null;

                    if (s == 4) {
                        msg = ' - 요청 주소가 잘못되었습니다.';
                    } else if (s == 5) {
                        msg = ' - 서버의 응답이 없습니다.';
                    } else {
                        msg = ' - 요청에 실패했습니다.';
                    }
                    reject({ status: ajax.status, text: ajax.statusText, msg: msg })

                }
            }
        };

        xhr.send();
    })
}

function ajaxHandlebar(params) {
    ajaxPromiseHelper({
        ...params,
        resolve(json) {
            const html = document.querySelector(params.tmpl).innerHTML;
            const template = Handlebars.compile(html);
            const result = template(json);
            document.querySelector(params.view).insertAdjacentHTML('beforeend', result);
        }
    });
}