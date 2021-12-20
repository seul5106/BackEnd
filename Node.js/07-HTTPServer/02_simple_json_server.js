const logger = require('../helper/LogHelper');
const util = require("../helper/UtillHelper");
const http = require('http');

const port = 3217;
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

    res.writeHead(200, {
        "Content-Type": "applocation/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "*"
    });

    let json = null;

    switch (req.method) {
        case "GET":
            json = {
                rt: "OK",
                message: "GET방식에 대한 요청입니다."
            }
            break;
        case "POST":
            json = {
                rt: "OK",
                message: "POST방식에 대한 요청입니다."
            }
            break;
        case "PUT":
            json = {
                rt: "OK",
                message: "PUT방식에 대한 요청입니다."
            }
            break;
        case "DELETE":
            json = {
                rt: "OK",
                message: "DELETE방식에 대한 요청입니다."
            }
            break;
    }
    res.write(JSON.stringify(json));
    res.end();
});

server.on("close", () => {
    logger.debug("백엔드가 종료되었습니다.")
});

/*setTimeout(() => {
    server.close();
}, 60000);*/