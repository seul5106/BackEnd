const logger = require('../helper/LogHelper');
const dayjs = require("dayjs");
const schedule = require("node-schedule");

const atTime = dayjs();
logger.debug(atTime.format("HH:mm:ss"));

const afTime = atTime.add(5, "second")
logger.debug(afTime.format("HH:mm:ss"));

const jsDate = afTime.toDate();
schedule.scheduleJob(jsDate, () => {
    logger.debug("5초 후 예약된 작업이 수행되었습니다.");
});

logger.debug(afTime.format("HH:mm:ss") + "에 작업이 예약되었습니다.");