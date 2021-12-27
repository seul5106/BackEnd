module.exports = (app) => {
    const router = require('express').Router();
    const logger = require('../../helper/LogHelper');
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

    return router;
}