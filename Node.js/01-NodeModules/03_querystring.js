const qs = require("querystring");
const url = require("url");

const address = "http://www.itpaper.co.kr:8765/hello/world.html?a=123&b=456";
const { query } = url.parse(address);
console.debug(query);

const mydata = qs.parse(query);
console.debug(mydata);

console.debug("요청 파라미터 중 a의 값 : %s (%s)", mydata.a, typeof mydata.a);
console.debug("요청 파라미터 중 b의 값 : %s (%s)", mydata.b, typeof mydata.b);

const obj = { name: "hello", nick: "world", "address": "서울시 서초구" };
const str = qs.stringify(obj);
console.log("조합된 요청 파라미터 : %s", str);