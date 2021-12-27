module.exports = (app) => {
    const router = require('express').Router();
    const logger = require('../../helper/LogHelper');
    
    router.route("/cookie")
        .post((req, res, next) => {
            for (key in req.body) {
                const str = "[" + req.method + "]" + key + "=" + req.body[key];
                logger.debug(str);
            }

            res.cookie("my_msg", req.body.msg, { maxAge: 30 * 1000, path: "/" });
            res.cookie("my_msg_signed", req.body.msg, { maxAge: 30 * 1000, path: "/", signed: true });
            res.status(200).send("ok");
        })
        .get((req, res, next) => {
            for (key in req.cookies) {
                const str = "[cookies]" + key + "=" + req.cookies[key];
                logger.debug(str);
            }

            for (key in req.signedCookies) {
                const str = "[signedCookies]" + key + "=" + req.signedCookies[key];
                logger.debug(str);
            }

            const my_msg = req.cookies.my_msg;
            const my_msg_signed = req.signedCookies.my_msg_signed;

            const result_data = {
                my_msg: my_msg,
                my_msg_signed: my_msg_signed
            };

            res.status(200).send(result_data);
        })
        .delete((req, res, next) => {
            res.clearCookie("my_msg", { path: "/" });
            res.clearCookie("my_msg_signed", { path: "/" });
            res.status(200).send("clear");
        });
    return router;
}