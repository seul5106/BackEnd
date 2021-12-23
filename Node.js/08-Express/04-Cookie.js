const logger = require('../helper/LogHelper');
const util = require("../helper/UtillHelper");

const url = require("url");
const path = require("path");

const express = require("express");
const useragent = require("express-useragent");
const static = require("serve-static");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");


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
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(methodOverride("X-HTTP-Method"));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(methodOverride("X-Method-Override"));
app.use(methodOverride("_method"));

const cookie_encrypt_key = "helloworld";
app.use(cookieParser(cookie_encrypt_key));


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