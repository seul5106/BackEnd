const logger = require('../helper/LogHelper');
const schedule = require('node-schedule');

schedule.scheduleJob("* * * * *", () => logger.info("1분에 한번씩 수행"));

schedule.scheduleJob("15,45 * * * *", () => logger.debug("매 시 15,45분 마다 수행"));

schedule.scheduleJob("*/2 * * * *", () => logger.warn("2분마다"));

logger.error("예약작업이 설정되었습니다.");