const logger = require('../helper/LogHelper');
const schedule = require("node-schedule");

const rule1 = new schedule.RecurrenceRule();
rule1.second = 30;
schedule.scheduleJob(rule1, () => logger.info("매분 " + rule1.second + "초 마다 수행!!"));

const rule2 = new schedule.RecurrenceRule();
rule2.minute = 03;
rule2.second = 10;
schedule.scheduleJob(rule2, () => logger.debug("매시간 " + rule2.minute + "분" + rule2.second + "초 마다 수행!!"));

const rule3 = new schedule.RecurrenceRule();
rule3.hour = 20;
rule3.minute = 03;
rule3.second = 20;
schedule.scheduleJob(rule3, () => logger.warn("매일 " + rule3.hour + "시" + rule3.minute + "분" + rule2.second + "초 마다 수행!!"));

const rule4 = new schedule.RecurrenceRule();
rule4.datOfWeek = [0, new schedule.Range(1, 5)];
rule4.second = 45;
schedule.scheduleJob(rule4, () => logger.debug("매주 월~금 매 분 45초마다 실행"));

logger.debug("예약작업이 설정되었습니다.");