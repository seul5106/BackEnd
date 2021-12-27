const config = require('../helper/_config');
const logger = require('../helper/LogHelper');
const util = require("../helper/UtillHelper");


const url = require("url");


const express = require("express");
const useragent = require("express-useragent");
const static = require("serve-static");
const favicon = require("serve-favicon");
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const expressSession = require("express-session");


const app = express();

app.use(useragent.express());
app.use((req, res, next) => {
    logger.debug("클라이언트가 접속했습니다.");

    const beginTime = Date.now(); //클라이언트가 접속한 시간

    //클라이언트의 IP주소
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress || req.socket.remoteAddress || req.connection.socket.remoteAddress;

    //클라이언트의 장치 정보 기록(UserAgent사용)
    logger.debug("[client]" + ip + "/" + req.useragent.os + "/" + req.useragent.browser + "(" + req.useragent.version + ") / " + req.useragent.platform);

    const current_url = url.format({ //클라이언트가 요청한 페이지URL
        protocol: req.protocol, //프로토콜
        host: req.get("host"), //호스트 ip
        port: req.port, //포트번호
        pathname: req.originalUrl, //경로
    });

    logger.debug("[" + req.method + "]" + decodeURIComponent(current_url));

    res.on("finish", () => { //클라이언트의 접속이 종료됬을때의 이벤트
        const endTime = Date.now(); //클라이언트가 종료한 시간
        const time = endTime - beginTime; //백엔드가 실행하는대 걸린 시간
        logger.debug("클라이언트의 접속이 종료되었습니다. ::: [runtime]" + time + "ms");
        logger.debug("-------------------------------------------------");
    });
    next(); // 여기서의 콜백함수를 종료하고 요청 URL에 연결된 기능으로 제어를 넘겨준다.
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json());

app.use(methodOverride("X-HTTP-Method"));
app.use(methodOverride("X-HTTP-Method-Override"));
app.use(methodOverride("X-Method-Override"));
app.use(methodOverride("_method"));

app.use(cookieParser(config.secure.cookie_encrypt_key));

app.use(
    expressSession({
        secret: config.secure.cookie_encrypt_key,
        resave: false,
        saveUninitialized: false
    }));




app.use("/", static(config.public_path));
app.use("/upload", static(config.upload.dir));
app.use("/thumb", static(config.thumbnail.dir));
app.use(favicon(config.favicon_path));

const router = express.Router();
app.use("/", router);





app.use(require('./routes/Setup')(app));
app.use(require('./routes/Params')(app));
app.use(require('./routes/Cookie')(app));
app.use(require('./routes/Session')(app));
app.use(require('./routes/FileUpload')(app));
app.use(require('./routes/SendMail')(app));
app.use(require('./routes/calc')(app));
app.use(require('./routes/covid19')(app));

const ip = util.myip();

app.listen(config.server_port, () => {
    logger.debug("------------------------------------------");
    logger.debug("|           Start Express Server         |");
    logger.debug("------------------------------------------");

    ip.forEach((v, i) => {
        logger.debug("server address => http://" + v + ":" + config.server_port);
    })

    logger.debug("------------------------------------------");
});