const logger = require('../helper/LogHelper');
const util = require("../helper/UtillHelper");

const url = require("url");
const path = require("path");

const express = require("express");
const useragent = require("express-useragent");
const static = require("serve-static");
const favicon = require("serve-favicon");

const app = express();

app.use(useragent.express());

app.use((req, res, next) => {
    logger.debug("클라이언트가 접속했습니다.");

    const beginTime = Date.now();
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    logger.debug("[client]" + ip + "/" + req.useragent.os + "/" + req.useragent.browser + "(" + req.useragent.version + ") / " + req.useragent.platform);

    const current_url = url.format({
        protocol: req.protocol,
        host: req.get("host"),
        port: req.port,
        pathname: req.originalUrl,
    });

    logger.debug("[" + req.method + "]" + decodeURIComponent(current_url));

    res.on("finish", () => {
        const endTime = Date.now();
        const time = endTime - beginTime;
        logger.debug("클라이언트의 접속이 종료되었습니다. ::: [runtime]" + time + "ms");
        logger.debug("-------------------------------------------------");
    });

    next();
});

const public_path = path.join(__dirname, "../public");
app.use("/", static(public_path));

app.use(favicon(public_path + "/favicon.png"));

const router = express.Router();
app.use("/", router);

router.route("/page1").get((req, res, next) => {
    let html = "<h1>Page1</h1>";
    html += "<h2>Express로 구현한 Node.js 백엔드 페이지</h2>";

    res.status(200);
    res.send(html);
});

router.route("/page2").get((req, res, next) => {
    let html = "<h1>Page2</h1>"
    html += "<h2>Node.js Backend Page</h2>";

    res.writeHead(200);
    res.write(html);
    res.end();
});

router.route("/page3").get((req, res, next) => {
    res.redirect("http://www.naver.com");
});

const port = 3000;
const ip = util.myip();

app.listen(port, () => {
    logger.debug("------------------------------------------");
    logger.debug("|           Start Express Server         |");
    logger.debug("------------------------------------------");

    ip.forEach((v, i) => {
        logger.debug("server address => http://" + v + ":" + port);
    })

    logger.debug("------------------------------------------");
});