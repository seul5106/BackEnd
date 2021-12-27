module.exports = (app) => {
    const router = require('express').Router();
    const logger = require('../../helper/LogHelper');
    const nodemailer = require("nodemailer");
    router.route("/send_mail").post(async(req, res, next) => {
        const writer_name = req.body.writer_name;
        let writer_email = req.body.writer_email;
        const receiver_name = req.body.receiver_name;
        let receiver_email = req.body.receiver_email;
        const subject = req.body.subject;
        const content = req.body.content;

        if (writer_name) {
            writer_email = writer_name + " <" + writer_email + ">";
        }

        if (receiver_name) {
            receiver_email = receiver_name + " <" + receiver_email + ">";
        }

        const send_info = { from: writer_email, to: receiver_email, subject: subject, html: content };
        logger.debug(JSON.stringify(send_info));

        const smtp = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: { user: "seul5106@gmail.com", pass: "idqrhqrfzcnbohzy" }
        });

        try {
            await smtp.sendMail(send_info);
        } catch (err) {
            console.error(err);
            return res.status(500).send("error");
        }
        res.status(200).send("ok");
    });
    return router;
}