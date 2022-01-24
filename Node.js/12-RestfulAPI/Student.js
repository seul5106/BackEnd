const config = require('../helper/_config');
const logger = require('../helper/LogHelper');
const router = require('express').Router();
const mysql2 = require('mysql2/promise');

module.exports = (app) => {
    let dbcon = null;

    router.get("/student", async(req, res, next) => {
        let json = null;

        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            const sql = "select studno, name, userid, grade, idnum, birthdate, tel, height, weight, deptno, profno from student";
            const [result] = await dbcon.query(sql);
            json = result;
        } catch (err) {
            dbcon.end();
            logger.error(err);

            return res.status(500).send({
                "rt": 500,
                "rtmsg": "요청을 처리하는데 실패했습니다.",
                "pubdate": new Date().toISOString()
            });
        }
        dbcon.end();

        return res.status(200).send({
            "rt": 200,
            "rtmsg": "OK",
            "item": json,
            "pubdate": new Date().toISOString()
        });
    });

    router.get("/student/:studno", async(req, res, next) => {
        const studno = req.params.studno;

        if (studno === undefined) {
            return res.status(400).send({
                "rt": 400,
                "rtmsg": "필수 파라미터가 없습니다.",
            });
        }

        let json = null;

        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            const sql = "select studno, name, userid, grade, idnum, birthdate, tel, height, weight, deptno, profno from student where studno=?";
            const [result] = await dbcon.query(sql, [studno]);
            json = result;
        } catch (err) {
            dbcon.end();
            logger.error(err);

            return res.status(500).send({
                "rt": 500,
                "rtmsg": "요청을 처리하는데 실패했습니다.",
                "pubdate": new Date().toISOString()
            });
        }
        dbcon.end();

        return res.status(200).send({
            "rt": 200,
            "rtmsg": "OK",
            "item": json,
            "pubdate": new Date().toISOString()
        });
    });

    router.post("/student", async(req, res, next) => {
        const name = req.body.name;
        const userid = req.body.userid;
        const grade = req.body.grade;
        const idnum = req.body.idnum;
        const birthdate = req.body.birthdate;
        const tel = req.body.tel;
        const height = req.body.height;
        const weight = req.body.weight;
        const deptno = req.body.deptno;
        const profno = req.body.profno;

        if (name == undefined || userid == undefined || userid == undefined || grade == undefined || idnum == undefined || birthdate == undefined || tel == undefined || height == undefined || weight == undefined || deptno == undefined) {
            return res.status(400).send({
                "rt": 400,
                "rtmsg": "필수 파라미터가 없습니다.",
            });
        }

        let json = null;

        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            const sql = "insert into student (name, userid, grade, idnum, birthdate, tel, height, weight, deptno, profno) values (?, ?, ?, ?, ?, ?, ?, ?,?,?)";
            const input_data = [name, userid, grade, idnum, birthdate, tel, height, weight, deptno, profno];
            const [result1] = await dbcon.query(sql, input_data);

            const sql2 = "select studno, name, userid, grade, idnum, birthdate, tel, height, weight, deptno, profno from student where studno=?";
            const [result2] = await dbcon.query(sql2, [result1.insertId]);
            json = result2;
        } catch (err) {
            dbcon.end();
            logger.error(err);

            return res.status(500).send({
                "rt": 500,
                "rtmsg": "요청을 처리하는데 실패했습니다.",
                "pubdate": new Date().toISOString()
            });
        }
        dbcon.end();

        return res.status(200).send({
            "rt": 200,
            "rtmsg": "OK",
            "item": json,
            "pubdate": new Date().toISOString()
        });
    });

    router.put("/student/:studno", async(req, res, next) => {
        const studno = req.params.studno;
        const name = req.body.name;
        const userid = req.body.userid;
        const grade = req.body.grade;
        const idnum = req.body.idnum;
        const birthdate = req.body.birthdate;
        const tel = req.body.tel;
        const height = req.body.height;
        const weight = req.body.weight;
        const deptno = req.body.deptno;
        const profno = req.body.profno;

        if (studno === undefined || name == undefined || userid == undefined || userid == undefined || grade == undefined || idnum == undefined || birthdate == undefined || tel == undefined || height == undefined || weight == undefined || deptno == undefined) {
            return res.status(400).send({
                "rt": 400,
                "rtmsg": "필수 파라미터가 없습니다.",
            });
        }

        let json = null;

        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            const sql = "update student set name = ?, userid = ?, grade= ?, idnum = ?, birthdate = ?, tel = ?, height = ?, weight = ?, deptno = ?, profno = ? where studno=?";
            const input_data = [name, userid, grade, idnum, birthdate, tel, height, weight, deptno, profno, studno];
            const [result1] = await dbcon.query(sql, input_data);
            logger.debug("에러발생지점")
            if (result1.affectedRows < 0) {
                throw new Error("수정된 데이터가 없습니다.");
            }

            const sql2 = "select studno, name, userid, grade, idnum, birthdate, tel, height, weight, deptno, profno from student where studno=?";
            const [result2] = await dbcon.query(sql2, [studno]);
            json = result2;

        } catch (err) {
            dbcon.end();
            logger.error(err.message);

            return res.status(500).send({
                "rt": 500,
                "rtmsg": "요청을 처리하는데 실패했습니다.",
                "pubdate": new Date().toISOString()
            });
        }
        dbcon.end();

        return res.status(200).send({
            "rt": 200,
            "rtmsg": "OK",
            "item": json,
            "pubdate": new Date().toISOString()
        });
    });

    router.delete("/student/:studno", async(req, res, next) => {
        const studno = req.params.studno;

        if (studno === undefined) {
            return res.status(400).send({
                "rt": 400,
                "rtmsg": "필수 파라미터가 없습니다.",
            });
        }

        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            const sql = "delete from student where studno=?";
            const [result1] = await dbcon.query(sql, [studno]);

            if (result1.affectedRows < 0) {
                throw new Error("삭제된 데이터가 없습니다.");
            }
        } catch (err) {
            dbcon.end();
            logger.error(err.message);

            return res.status(500).send({
                "rt": 500,
                "rtmsg": "요청을 처리하는데 실패했습니다.",
                "pubdate": new Date().toISOString()
            });
        }
        dbcon.end();

        return res.status(200).send({
            "rt": 200,
            "rtmsg": "OK",
            "pubdate": new Date().toISOString()
        });
    });

    return router;
}