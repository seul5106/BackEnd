const fileHelper = require('../helper/FileHelper.js');
const winston = require('winston');
const winstonDaily = require('winston-daily-rotate-file');
const path = require('path');

const config = {
    log: {
        debug: {
            path: path.join(__dirname, "../_files/_logs"),
            level: 'debug',
        },
        error: {
            path: path.join(__dirname, "../_files/_logs"),
            level: 'error',
        },
    },
};

fileHelper.mkdirs(config.log.debug.path);
fileHelper.mkdirs(config.log.error.path);

const { combine, timestamp, printf, splat, simple } = winston.format;

const logger = winston.createLogger({
    format: combine(
        timestamp({
            format: "YY/MM/DD HH:mm:ss.SSS"
        }),
        printf((info) => {
            return `${info.timestamp} [${info.level}] ${info.message}`;
        }),
        splat()
    ),

    transports: [
        new winstonDaily({
            name: "debug-file",
            level: config.log.debug.level,
            datePattern: "YYMMDD",
            dirname: config.log.debug.path,
            filename: "log_%DATE%.log",
            maxsize: 50000000,
            maxFiles: 50,
            zippedArchive: true
        }),

        new winstonDaily({
            name: "error-file",
            level: config.log.debug.level,
            datePattern: "YYMMDD",
            dirname: config.log.debug.path,
            filename: "log_%DATE%.log",
            maxsize: 50000000,
            maxFiles: 50,
            zippedArchive: true
        })

    ]
});

if (process.env.NODE_ENV !== "production") {
    logger.add(
        new winston.transports.Console({
            prettyPrint: true,
            showLevel: true,
            level: config.log.debug.level,
            format: combine(
                winston.format.colorize(),
                printf((info) => {
                    return `${info.timestamp} [${info.level}] ${info.message}`;
                })
            )
        })
    );
}

logger.error("error 메시지 입니다. (1수준)");
logger.warn("warn 메시지 입니다. (2수준)")
logger.info("info 메시지 입니다. (3수준)")
logger.verbose("verbose 메시지 입니다. (4수준)")
logger.debug("debug 메시지 입니다. (5수준)")