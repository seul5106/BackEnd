module.exports = (app) => {
    const router = require('express').Router();
    const logger = require('../../helper/LogHelper');
    router.route("/calc")
        .get((req, res, next) => {
            let result = parseInt(req.query.num1) + parseInt(req.query.num2);
            const html = "<h1><span style='color:#0066ff'>" + req.query.num1 + "</span> + <span style='color:#ff6600'>" + req.query.num2 + "</span> = " + result + "</h1>";
            res.status(200).send(html);
        })
        .post((req, res, next) => {
            let result = parseInt(req.body.num1) - parseInt(req.body.num2);
            const html = "<h1><span style='color:#0066ff'>" + req.body.num1 + "</span> - <span style='color:#ff6600'>" + req.body.num2 + "</span> = " + result + "</h1>";
            res.status(200).send(html);
        })
        .put((req, res, next) => {
            let result = parseInt(req.body.num1) * parseInt(req.body.num2);
            const html = "<h1><span style='color:#0066ff'>" + req.body.num1 + "</span> * <span style='color:#ff6600'>" + req.body.num2 + "</span> = " + result + "</h1>";
            res.status(200).send(html);
        })
        .delete((req, res, next) => {
            let result = parseInt(req.body.num1) / parseInt(req.body.num2);
            const html = "<h1><span style='color:#0066ff'>" + req.body.num1 + "</span> / <span style='color:#ff6600'>" + req.body.num2 + "</span> = " + result + "</h1>";
            res.status(200).send(html);
        })
    return router;
}