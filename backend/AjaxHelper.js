function ajaxHelper(params) {

    const xhr = new XMLHttpRequest();
    xhr.open(params.method || 'GET', params.url);

    if (params.headers != undefined) {
        for (const key in params.headers) {
            xhr.setRequestHeader(key, params.headers[key]);
        }
    }

    xhr.onreadystatechange = (e) => {
        const ajax = e.target;

        if (ajax.readyState == XMLHttpRequest.DONE) {
            if (ajax.status == 200) {

                if (params.success != undefined) {
                    const json = JSON.parse(ajax.responseText);

                    params.success(json);
                }
            } else {
                const s = parseInt(ajax.status / 100);
                let errMsg = null;

                if (s == 4) {
                    errMsg = '[' + ajax.status + '] ' + ajax.statusText + ' - 요청 주소가 잘못되었습니다.';
                } else if (s == 5) {
                    errMsg = '[' + ajax.status + '] ' + ajax.statusText + ' - 서버의 응답이 없습니다.';
                } else {
                    errMsg = '[' + ajax.status + '] ' + ajax.statusText + ' - 요청에 실패했습니다.';
                }

                alert(errMsg);
            }
        }
    };

    xhr.send();
}

function ajaxHandlebar(params) {
    ajaxHelper({
        ...params,
        success: json => {
            const html = document.querySelector(params.tmpl).innerHTML;
            const template = Handlebars.compile(html);
            const result = template(json);

            document.querySelector(params.view).insertAdjacentHTML('beforeend', result);
        }
    });
}