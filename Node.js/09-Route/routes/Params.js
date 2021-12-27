module.exports = (app) => {
    const router = require('express').Router();
    const logger = require('../../helper/LogHelper');
    const axios = require('axios');
    router.route("/send_get").get((req, res, next) => {
        for (key in req.query) {
            const str = "프론트엔드로부터 전달받은 변수 ::: " + key + "=" + req.query[key];
            logger.debug(str);
        }

        const answer = req.query.answer;
        let html = null;

        if (parseInt(answer) == 300) {
            html = "<h1 style='color:#0066ff'>정답입니다.</h1>";
        } else {
            html = "<h1 style='color:#ff6600'>틀렸습니다.</h1>"
        }
        res.status(200).send(html);
    });

    router.route("/send_url/:username/:age").get((req, res, next) => {
        for (key in req.params) {
            const str = "프론트엔드로부터 전달받은 변수 ::: " + key + "=" + req.params[key];
            logger.debug(str);
        }
        const html = "<h1><span style='color:#0066ff'>" + req.params.username + "</span>님은 <span style='color:#ff6600'>" + req.params.age + "</span>세 입니다.</h1>";

        res.status(200).send(html);
    });

    router.route("/send_post").post((req, res, next) => {
        for (key in req.body) {
            const str = "프론트엔드로부터 전달받은 변수 ::: " + key + "=" + req.body[key];
            logger.debug(str);
        }
        const html = "<h1><span style='color:#0066ff'>" + req.body.username + "</span>님의 이메일 주소는 <span style='color:#ff6600'>" + req.body.email + "</span> 입니다.</h1>";

        res.status(200).send(html);
    });

    router.route("/send_put").put((req, res, next) => {
        for (key in req.body) {
            const str = "프론트엔드로부터 전달받은 변수 ::: " + key + "=" + req.body[key];
            logger.debug(str);
        }
        const html = "<h1><span style='color:#0066ff'>" + req.body.username + "</span>님은 <span style='color:#ff6600'>" + req.body.grade + "</span>학년 입니다.</h1>";

        res.status(200).send(html);
    });

    router.route("/send_delete").delete((req, res, next) => {
        for (key in req.body) {
            const str = "프론트엔드로부터 전달받은 변수 ::: " + key + "=" + req.body[key];
            logger.debug(str);
        }
        const html = "<h1><span style='color:#0066ff'>" + req.body.username + "</span>님의 점수는 <span style='color:#ff6600'>" + req.body.point + "</span>점 입니다.</h1>";

        res.status(200).send(html);
    });


    return router;
}