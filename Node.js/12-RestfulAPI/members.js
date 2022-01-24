const config = require('../helper/_config');
const logger = require('../helper/LogHelper');
const router = require('express').Router();
const mysql2 = require('mysql2/promise');
const regexHelper = require("../helper/regex_helper");

module.exports = (app) => {
    let dbcon = null;

    router.post("/members", async(req, res, next) => {
        const idname = req.post("idname");
        const password = req.post("password");
        const name = req.post("name");
        const birthdate = req.post("birthdate");
        const gender = req.post("gender");
        const email = req.post("email");
        const nation_num = req.post("nation_num");
        const tel = req.post("tel");
        const reg_date = req.post("reg_date");

        let json = null;

        try {
            regexHelper.value(idname, "아이디가 없습니다.");
            regexHelper.value(password, "비밀번호가 없습니다.");
            regexHelper.value(name, "이름이 없습니다.");
            regexHelper.value(birthdate, "생년월일이 없습니다.");
            regexHelper.value(gender, "성별 없습니다.");
            regexHelper.value(email, "이메일이 없습니다.");
            regexHelper.value(nation_num, "국가번호가 없습니다.");
            regexHelper.value(tel, "전화번호 없습니다.");
            regexHelper.value(reg_date, "등록일이 없습니다.");

            regexHelper.max_length(idname, 30, "아이디가 너무 깁니다.");
            regexHelper.max_length(password, 255, "비밀번호가 너무 깁니다.");
            regexHelper.max_length(name, 20, "이름이 너무 깁니다.");


            regexHelper.max_length(email, 150, "이메일이 너무 깁니다.");
            regexHelper.max_length(nation_num, 4, "국가번호가 너무 깁니다.");
            regexHelper.max_length(tel, 11, "전화번호가 너무 깁니다.");

        } catch (err) {
            return next(err);
        }



        try {
            dbcon = await mysql2.createConnection(config.database);
            await dbcon.connect();

            const sql = "insert into members (idname, password, name, birthdate, gender, email, nation_num, tel, reg_date) values (?, ?, ?, ?, ?, ?, ?, ?, ?)";
            const input_data = [idname, password, name, birthdate, gender, email, nation_num, tel, reg_date];
            const [result1] = await dbcon.query(sql, input_data);

            const sql2 = "select id, idname, password, name, birthdate, gender, email, nation_num, tel, reg_date from members where id=?";
            const [result2] = await dbcon.query(sql2, [result1.insertId]);
            json = result2;
        } catch (err) {
            return next(err);
        } finally {
            dbcon.end();
        }

        res.sendJson({ "item": json });
    });


    return router;
}