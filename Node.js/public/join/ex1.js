/**
 * @filename  : ex1.js
 * @author    : 정한슬 (seul5106@gmail.com)
 * @description : 정규표현식 검사를 진행하고 정규표현식을 true/false로 반환하는 함수들의 모음
 * 
 * 
 */


class Member {
    /**
     * 값이 존재하는지 검사한다.
     * @param {string} selector 입력요소에 해당하는 css 선택자
     * @param {string} msg  값이 없을때 표시할 메시지 내용
     * @param {boolean} 값이 존재하는 경우 true / 값이 없을 경우 false
     */
    value(selector, msg) {
        const field = document.querySelector(selector);
        const content = field.value.trim();

        if (!content) {
            alert(msg);
            field.focus();
            return false;
        }
        return true;
    }

    /**
     * 입력값이 지정된 글자수를 초과했는지 검사한다.
     * @param {string} selector     입력요소에 해당하는 css 선택자
     * @param {int} len             최대 글자수
     * @param {string} msg          값이 없을 경우 표시될 메시지
     * @return {boolean} 초과하지 않은 경우 true / 초과한 경우 false 
     */
    max_length(selector, len, msg) {
        const field = document.querySelector(selector);
        const content = field.value.trim();
        if (content.length > len) {
            alert(msg);
            field.value = "";
            field.focus();
            return false;
        }
        return true;
    }

    /**
     * 입력값이 지정된 글자수 미만인지 검사한다.
     * @param {string} selector  입력요소에 해당하는 css 선택자
     * @param {int} len     최대 글자수
     * @param {string} msg  값이 없을 경우 표시될 메시지
     * @return {boolean} 지정된 글자수 이상인 경우 true / 미만인 경우 false  
     */
    min_length(selector, len, msg) {
            const field = document.querySelector(selector);
            const content = field.value.trim();
            if (content.length < len) {
                alert(msg);
                field.value = "";
                field.focus();
                return false;
            }
            return true;
        }
        /**
         * 선택되어있는 값이 비어있는지 체크한다.
         * @param {string} selector 입력요소에 해당하는 css 선택자
         * @param {string} msg 값이 없을 경우 표시될 메시지
         * @returns {boolean} 값이 존재할 경우 ture / 비어있을 경우 false
         */
    checked(selector, msg) {
        const value = document.querySelector(selector).value;

        if (!value) {
            alert(msg);
            return false;
        }

        return true;
    }


    /**
     * 두 요소의 입력값이 동일한지 검사한다.
     * @param {string} first   원본 요소의 selector
     * @param {string} second  검사 대상 요소의 selector
     * @param {string} msg       검사에 실패할 경우 표시할 메시지
     * @return {boolean} 동일한 경우 true / 다른 경우 false
     */
    compare_to(First, Second, msg) {
        const first = document.querySelector(First);
        const second = document.querySelector(Second);
        let src = first.value.trim();
        let dsc = second.value.trim();

        if (src != dsc) {
            alert(msg);
            first.value = "";
            second.value = "";
            first.focus();
            return false;
        }
        return true;
    }

    /**
     * 입력값이 정규 표현식을 충족하는지 검사한다.
     * @param {string} selector    입력 요소에 해당하는 css 선택자
     * @param {string} msg         표시할 메시지
     * @param {object} regexp 검사할 정규 표현식
     * @return {boolean}   표현식을 충족할 경우 true / 그렇지 않은 경우 false
     */
    field(selector, msg, regexp) {
        const field = document.querySelector(selector);
        let src = field.value.trim();

        if (!src || !regexp.test(src)) {
            alert(msg);
            field.value = "";
            field.focus();
            return false;
        }
        return true;
    }

    num(selector, msg) {
        return this.field(selector, msg, /^[0-9]*&/);
    }

    eng(selector, msg) {
        return this.field(selector, msg, /^[a-zA-Z]*$/);
    }

    kor(selector, msg) {
        return this.field(selector, msg, /^[ㄱ-ㅎ가-힣]*$/);
    }

    eng_num(selector, msg) {
        return this.field(selector, msg, /^[a-zA-Z0-9]*$/);
    }

    kor_num(selector, msg) {
        return this.field(selector, msg, /^[ㄱ-ㅎ가-힣0-9]*$/);
    }

    email(selector, msg) {
        return this.field(selector, msg, /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i);
    }

    cellphone(selector, msg) {
        return this.field(selector, msg, /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/);
    }

    since(selector, msg) {
        return this.field(selector, msg, /(?:(?:18|19|20|21)[0-9]{2})/g);
    }

    /**
     * 날짜의 day부분(1일부터 31일)을 판별하는 판별식
     * @param {string} selector 입력 요소에 해당하는 css선택자
     * @param {string} msg  표시할 메시지
     * @returns {boolean}   판별식을 충족하지 못할 경우 false/ 충족할 경우 true
     */
    day(selector, msg) {
        const value = document.querySelector(selector).value.trim();
        if (value > 31) {
            alert(msg);
            return false;
        } else if (value < 0) {
            alert(msg);
            return false;
        }
        return true;
    }




















}