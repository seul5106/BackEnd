const logger = require('../helper/LogHelper');
const util = require("../helper/UtillHelper");
const http = require('http');

const port = 3216;
const ip = util.myip();
const server = http.createServer();

server.listen(port, () => {
    logger.debug(port, "번 포트에서 백엔드가 구동되었습니다.");
    logger.debug("-----------------------");

    ip.forEach((v, i) => {
        logger.debug("http://" + v + ":" + port);
    });
});

server.on("connection", (socket) => {
    logger.debug("프론트엔드가 접속했습니다. : " + socket.remoteAddress + "," + socket.remotePort);
    logger.debug(socket);
});

server.on("request", (req, res) => {
    logger.debug("프론트엔드의 요청 >> [" + req.method + "]" + req.url);

    res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });

    res.write("<!DOCTYPE html>");
    res.write("<html>");
    res.write("<head>");
    res.write("<meta charset=\"utf-8\" />");
    res.write("</head>");
    res.write("<body>");

    if (req.url == "/hello.html") {
        res.write("<h1>Hello World</h1>");
    } else {
        res.write("<h1>노드제이에스로부터의 응답 페이지</h1>");
    }

    res.write("</body>");
    res.write("</html>");
    res.end();
});

server.on("close", () => {
    logger.debug("백엔드가 종료되었습니다.")
});

setTimeout(() => {
    server.close();
}, 60000);