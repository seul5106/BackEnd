const url = require("url");

const myurl = "http://www.itpaper.co.kr:8765/hello/world.html?a=123&b=456#home";

const location = url.parse(myurl);

console.group("URL 성분 정보 확인");
console.debug(location);
console.debug("href: " + location.href);
console.debug("protocol: " + location.protocol);
console.debug("port: " + location.port);
console.debug("host: " + location.host);
console.debug("path: " + location.hostname);
console.debug("pathname: " + location.path);
console.debug("search: " + location.pathname);
console.debug("query: " + location.search);
console.debug("hash: " + location.hash);
console.groupEnd();