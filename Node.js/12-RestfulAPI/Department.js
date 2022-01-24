const config = require('../helper/_config');
const logger = require('../helper/LogHelper');
const router = require('express').Router();
const mysql2 = require('mysql2/promise');
const regexHelper = require("../helper/regex_helper");
const utillHelper = require('../helper/UtillHelper');

module.exports = (app) => {
    let dbcon = null;

    router.get("/department", async(req, res, next) => {
        const query = req.get('query');

        const page = req.get('page', 1);
        const rows = req.get('rows', 10);

        let json = null;
        let pagenation = null;
        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            let sql1 = "select count(*) as cnt from department";
            let args1 = [];

            if (query != null) {
                sql1 += " where dname like concat('%', ?, '%')";
                args1.push(query);
            }

            const [result1] = await dbcon.query(sql1, args1);
            const totalCount = result1[0].cnt;

            pagenation = utillHelper.pagenation(totalCount, page, rows);
            logger.debug(JSON.stringify(pagenation));

            let sql2 = "select deptno, dname, loc from department";
            let args2 = [];

            if (query != null) {
                sql2 += " where dname like concat('%', ?, '%')"
                args2.push(query);
            }

            sql2 += " limit ?, ?";
            args2.push(pagenation.offset);
            args2.push(pagenation.listCount);

            const [result2] = await dbcon.query(sql2, args2);
            json = result2;

        } catch (err) {
            return next(err);
        } finally {
            dbcon.end();
        }

        res.sendJson({ "pagenation": pagenation, "item": json });

    });

    router.get("/department/:deptno", async(req, res, next) => {
        const deptno = req.get("deptno");

        if (deptno == null) {
            return next(new Error(400));
        }

        let json = null;

        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            const sql = "select deptno, dname, loc from department where deptno=?";
            const [result] = await dbcon.query(sql, [deptno]);
            json = result;
        } catch (err) {
            return next(err);
        } finally {
            dbcon.end();
        }

        res.sendJson({ "item": json });
    });

    router.post("/department", async(req, res, next) => {
        const dname = req.post("dname");
        const loc = req.post("loc");

        try {
            regexHelper.value(dname, "학과이름이 없습니다.");
            regexHelper.max_length(dname, 10, "학과이름이 너무 깁니다.");
        } catch (err) {
            return next(err);
        }

        let json = null;

        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            const sql = "insert into department (dname, loc) values (?, ?)";
            const input_data = [dname, loc];
            const [result1] = await dbcon.query(sql, input_data);

            const sql2 = "select deptno, dname, loc from department where deptno=?";
            const [result2] = await dbcon.query(sql2, [result1.insertId]);
            json = result2;
        } catch (err) {
            return next(err);
        } finally {
            dbcon.end();
        }

        res.sendJson({ "item": json });
    });

    router.put("/department/:deptno", async(req, res, next) => {
        const deptno = req.get("deptno");
        const dname = req.put("dname");
        const loc = req.put("loc");

        if (deptno == null || dname == null) {
            return next(new Error(400));
        }

        let json = null;

        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            const sql = "update department set dname = ?, loc = ? where deptno=?";
            const input_data = [dname, loc, deptno];
            const [result1] = await dbcon.query(sql, input_data);

            if (result1.affectedRows < 0) {
                throw new Error("수정된 데이터가 없습니다.");
            }

            const sql2 = "select deptno, dname, loc from department where deptno=?";
            const [result2] = await dbcon.query(sql2, [deptno]);
            json = result2;

        } catch (err) {
            return next(err);
        } finally {
            dbcon.end();
        }

        res.sendJson({ "item": json });
    });

    router.delete("/department/:deptno", async(req, res, next) => {
        const deptno = req.get("deptno");

        if (deptno === null) {
            return next(new Error(400));
        }

        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            await dbcon.query("delete from student where deptno=?", [deptno]);
            await dbcon.query("delete from professor where deptno=?", [deptno]);

            const sql = "delete from department where deptno=?";
            const [result1] = await dbcon.query(sql, [deptno]);

            if (result1.affectedRows < 0) {
                throw new Error("삭제된 데이터가 없습니다.");
            }
        } catch (err) {
            return next(err);
        } finally {
            dbcon.end();
        }

        res.sendJson();
    });

    return router;
}